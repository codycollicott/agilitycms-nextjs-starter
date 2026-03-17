import FlexSearch from "flexsearch";
import agility from "@agility/content-fetch";
import { NextResponse } from "next/server";

// Global search index and pages array
let index = null;
let pages = [];

// Helper function: recursively extract text from any object, including linked content
const extractText = (obj) => {
    if (!obj) return "";
    let text = "";

    if (typeof obj === "string") {
        text += obj + " ";
    } else if (Array.isArray(obj)) {
        obj.forEach((item) => {
            text += extractText(item);
        });
    } else if (typeof obj === "object") {
        // Extract known fields
        if (obj.fields) {
            Object.values(obj.fields).forEach((value) => {
                text += extractText(value);
            });
        }

        // Linked content (nested contentItem)
        if (obj.contentItem) {
            text += extractText(obj.contentItem.fields);
        }

        // Recursively check all other properties
        Object.keys(obj).forEach((key) => {
            if (key !== "fields" && key !== "contentItem") {
                text += extractText(obj[key]);
            }
        });
    }

    return text;
};

// Load sitemap and build FlexSearch index
async function loadSitemapData() {
    if (index !== null) return; // Already loaded

    const isDevelopmentMode = process.env.NODE_ENV === "development";
    const isPreview = isDevelopmentMode;

    const apiKey = isPreview
        ? process.env.AGILITY_API_PREVIEW_KEY
        : process.env.AGILITY_API_FETCH_KEY;

    const agilityClient = agility.getApi({
        guid: process.env.AGILITY_GUID,
        apiKey,
        isPreview,
    });

    const languageCode = process.env.AGILITY_LOCALES || "en-us";

    // Load sitemap
    
    const sitemap = await agilityClient.getSitemapFlat({
        channelName: process.env.AGILITY_SITEMAP || "website",
        languageCode,
    });

    // Build page promises
    const pagePromises = Object.values(sitemap).map(async (node) => {
        const data = await agilityClient.getPage({
            pageID: node.pageID,
            languageCode,
            channelName: process.env.AGILITY_SITEMAP || "website",
            contentLinkDepth: 4,
        });

        // Build pageContent by extracting text from all zones/modules
        const pageContent = Object.keys(data.zones)
            .map((zoneKey) => {
                const zone = data.zones[zoneKey];
                return zone.map((module) => extractText(module)).join(" ");
            })
            .join(" ");

        const cleanedContent = pageContent
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/[\r\n]+/g, " ")
            .trim();

        return {
            id: data.pageID,
            title: data.title,
            content: cleanedContent,
            url: node.path || "", // fallback if path is null
        };
    });

    pages = await Promise.all(pagePromises);

    // Initialize FlexSearch index
    index = new FlexSearch.Document({
        tokenize: "full",
        document: {
            id: "id",
            index: ["title", "content", "url"],
            store: ["title", "content", "url"],
        },
        context: {
            resolution: 9,
            depth: 2,
            bidirectional: true,
        },
    });

    pages.forEach((page) => index.update(page));

    console.log("Sitemap data loaded successfully");
}

// Preload data when server starts
loadSitemapData().catch(console.error);

// ---------------- GET Search Endpoint ----------------
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!index) {
        console.log("Search index is empty, loading...");
        await loadSitemapData();
    }

    if (!query) {
        return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    // Search across multiple fields and remove duplicates
    const results = Array.from(
        new Set(
            index
                .search(query, { index: ["title", "content", "url"] })
                .flatMap((result) => result.result)
        )
    ).map((id) => pages.find((page) => page.id.toString() === id.toString()));

    return NextResponse.json(results.flat());
}

// ---------------- POST Webhook for Rebuild ----------------
export async function POST() {
    try {
        index = null; // Reset index
        await loadSitemapData(); // Rebuild index
        return NextResponse.json({ message: "Index updated successfully" });
    } catch (error) {
        console.error("Error updating index:", error);
        return NextResponse.json({ error: "Failed to update index" }, { status: 500 });
    }
}