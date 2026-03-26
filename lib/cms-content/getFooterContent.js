import { getContentList } from "lib/cms/getContentList"


export const getFooterContent = async ({ locale }) => {

  // set up content item
  let contentItem = null
  
  // set up links
  let links

  try {
    // try to fetch our site header
    
    const footerRes = await getContentList({
      referenceName: "brandFooter",
      languageCode: locale,
      take: 1,
    });
    const resolveLinkBank = async (bank) => {
      if (!bank?.referencename) return [];

      const res = await getContentList({
        referenceName: bank.referencename,
        languageCode: locale,
      });

      return res.items;
    };

    const linkBanks = await Promise.all([
      resolveLinkBank(footerRes.items[0].fields.linkBank1),
      resolveLinkBank(footerRes.items[0].fields.linkBank2),
      resolveLinkBank(footerRes.items[0].fields.linkBank4),
    ]);

    links = linkBanks;

    // if we have a header, set as content item
    if (footerRes?.items[0]) {
      contentItem = footerRes?.items?.[0]?.fields
    }

    if (!contentItem) {
      return null
    }
  } catch (error) {
    if (console) console.error("Could not load site header item.", error)
    return null
  }

  

  // return clean object...
  return {
    data: contentItem,
    links: links
  } 
}



