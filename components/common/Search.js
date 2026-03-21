'use client'

import {
  forwardRef,
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Highlighter from 'react-highlight-words'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  createAutocomplete,
} from '@algolia/autocomplete-core'
import clsx from 'clsx'
import {FaLink} from "react-icons/fa6"



function useAutocomplete({ close }) {
  let id = useId()
  let router = useRouter()
  let [autocompleteState, setAutocompleteState] = useState({})

  function navigate({ itemUrl }) {

    if (!itemUrl) {
      return
    }

    router.push(itemUrl)

    if (
      itemUrl ===
      window.location.pathname + window.location.search + window.location.hash
    ) {
      close()
    }
  }

  let [autocomplete] = useState(() =>
    createAutocomplete({
      id,
      placeholder: 'Find something...',
      defaultActiveItemId: 0,
      onStateChange({ state }) {
        setAutocompleteState(state)
      },
      shouldPanelOpen({ state }) {
        return state.query !== ''
      },
      navigator: {
        navigate,
      },
      getSources({ query }) {

       
      return [
        {
          sourceId: 'documentation',
          async getItems() {

            const response = await fetch(`/api/search?query=${query}`);
            console.log(response)
						const items = await response.json()
						console.log(response)
            return items || []
          },
          getItemUrl({ item }) {
            return item.url
          },
          onSelect: navigate,
        },
      ]
      },
    }),
  )

  return { autocomplete, autocompleteState }
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
      />
    </svg>
  )
}

function NoResultsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.237 4.237 0 0 0 1.24-3c0-.62-.132-1.207-.37-1.738M12.01 12A4.237 4.237 0 0 1 9 13.25c-.635 0-1.237-.14-1.777-.388M12.01 12l3.24 3.25m-3.715-9.661a4.25 4.25 0 0 0-5.975 5.908M4.5 15.5l11-11"
      />
    </svg>
  )
}

function LoadingIcon(props) {
  let id = useId()

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="5.5" strokeLinejoin="round" />
      <path
        stroke={`url(#${id})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 10a5.5 5.5 0 1 0-5.5 5.5"
      />
      <defs>
        <linearGradient
          id={id}
          x1="13"
          x2="9.5"
          y1="9"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const getSnippetWithHighlight = (text, searchTerm, snippetLength = 60) => {
  if (!searchTerm) return "";
  if (!text) return "";
  const index = text?.toLowerCase()?.indexOf(searchTerm?.toLowerCase());
  if (index === -1) return ""; // If no match found, return empty string

  // Define snippet boundaries
  let start = Math.max(index - snippetLength / 2, 0);
  let end = Math.min(index + searchTerm?.length + snippetLength / 2, text?.length);

  // Ensure we don't cut off words abruptly
  while (start > 0 && text[start] !== " ") start--; // Move back to the nearest space
  while (end < text.length && text[end] !== " ") end++; // Move forward to the nearest space

  // Extract snippet
  let snippet = text.slice(start, end);
  if (start > 0) snippet = "... " + snippet; // Add leading ellipsis if text was cut
  if (end < text.length) snippet = snippet + " ..."; // Add trailing ellipsis if text was cut

  return snippet;
};

function HighlightContent({ text, query }) {

  const truncatedText = getSnippetWithHighlight(text, query, 200);

  if(!truncatedText && truncatedText !== '') return null;
  return (
    // @ts-ignore
    // throwing ts errors
    <Highlighter
      highlightClassName="underline bg-transparent text-yellow-500 truncate"
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={truncatedText}
    />
  )
}
function HighlightQuery({ text, query }) {

  // const truncatedText = getSnippetWithHighlight(text, query, 200);

  return (
    // @ts-ignore
    // throwing ts errors
    <Highlighter
      highlightClassName="underline bg-transparent text-yellow-500 truncate"
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={text}
    />
  )
}

function SearchResult({
  result,
  resultIndex,
  autocomplete,
  collection,
  query,
}) {
  let id = useId()
  let hierarchy = [result?.url].filter(
    (x) => typeof x === 'string',
  )

  // console.log(hierarchy)

  return (
    <li
      className='p-2 cursor-pointer bg-white hover:bg-gray-100'
      aria-labelledby={`${id}-hierarchy ${id}-title`}
      {...autocomplete.getItemProps({
        item: result,
        source: collection.source,
      })}
    >
     
      <div
        id={`${id}-title`}
        aria-hidden="true"
        className="flex flex-row items-center text-sm font-bold mb-2"
      >

				<div className=''>
      		<FaLink className='h-5 w-5 mr-2 text-yellow-500' />
      	</div>
       	<HighlightQuery text={result.title} query={query} />
      </div>

      <div
				id={`${id}-content`}
				aria-hidden="true"
				className="text-xs font-light mb-2"
      >

        <HighlightContent text={result.content} query={query} />

      </div>

      {hierarchy.length > 0 && (
        <div
          id={`${id}-hierarchy`}
          aria-hidden="true"
          className="mt-1 capitalize truncate whitespace-nowrap text-sm underline"
        >
          {hierarchy.map((item, itemIndex, items) => (
            <Fragment key={itemIndex}>
              <HighlightQuery text={item.replaceAll('/', ' > ').replace('>','').replaceAll('-', ' ')} query={query} />
              <span
                className={
                  itemIndex === items.length - 1
                    ? 'sr-only text-sm'
                    : 'mx-2 text-zinc-300 dark:text-zinc-700 text-sm underline'
                }
              >
                /
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </li>
  )
}

function SearchResults({
  autocomplete,
  query,
  collection,
}) {


  if (collection?.items?.length === 0) {
    return (
      <div className="p-6 text-center">
        <NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 dark:stroke-zinc-600" />
        <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
          Nothing found for{' '}
          <strong className="break-words font-semibold text-zinc-900 dark:text-white">
            &lsquo;{query}&rsquo;
          </strong>
          . Please try again.
        </p>
      </div>
    )
  }

  return (
    <ul {...autocomplete.getListProps()}>
      {collection.items.map((result, resultIndex) => { 
        
        // console.log('result', result)
        return (
        <SearchResult
          onClick={() => {console.log('clicked'); setOpen(false)}}
          key={result.url || resultIndex}
          result={result}
          resultIndex={resultIndex}
          autocomplete={autocomplete}
          collection={collection}
          query={query}
        />
      )})}
    </ul>
  )
}

const SearchInput = forwardRef(function SearchInput({ autocomplete, autocompleteState, onClose }, inputRef) {
  let inputProps = autocomplete.getInputProps({ inputElement: null })

  return (
    <div className="group relative flex">
      <input
        ref={inputRef}
        data-autofocus
        className={clsx(
          'border border-gray-600 rounded-md px-4 py-2 bg-gray-200 w-full',
          autocompleteState.status === 'stalled' ? 'pr-11' : 'pr-4',
        )}
        {...inputProps}
        onKeyDown={(event) => {
          if (
            event.key === 'Escape' &&
            !autocompleteState.isOpen &&
            autocompleteState.query === ''
          ) {
            // In Safari, closing the dialog with the escape key can sometimes cause the scroll position to jump to the
            // bottom of the page. This is a workaround for that until we can figure out a proper fix in Headless UI.
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }

            onClose()
          } else {
            inputProps.onKeyDown(event)
          }
        }}
      />
      {autocompleteState.status === 'stalled' && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <LoadingIcon className="h-5 w-5 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-gray-400" />
        </div>
      )}
    </div>
  )
})

function SearchDialog({
  open,
  setOpen,
  className,
}) {
  let formRef = useRef(null)
  let panelRef = useRef(null)
  let inputRef = useRef(null)
  let { autocomplete, autocompleteState } = useAutocomplete({
    close() {
      setOpen(false)
    },
  })
  let pathname = usePathname()
  let searchParams = useSearchParams()

  useEffect(() => {
    setOpen(false)
  }, [pathname, searchParams, setOpen])

  useEffect(() => {
    if (open) {
      return
    }

    function onKeyDown(event) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, setOpen])

  return (
    
		
    <div className='relative' {...autocomplete.getRootProps({})}>
      <form
        ref={formRef}
        className='absolute w-full'
        {...autocomplete.getFormProps({
          inputElement: inputRef.current,
        })}
      >
        <SearchInput
          ref={inputRef}
          autocomplete={autocomplete}
          autocompleteState={autocompleteState}
          onClose={() => setOpen(false)}
        />
        <div
          ref={panelRef}
          className=" empty:hidden"
          {...autocomplete.getPanelProps({})}
        >
          {autocompleteState.isOpen && (
            <SearchResults
              autocomplete={autocomplete}
              query={autocompleteState.query}
              collection={autocompleteState.collections[0]}
            />
          )}
        </div>
      </form>
    </div>
  )
}

function useSearchProps() {
  let buttonRef = useRef(null)
  let buttonRef2 = useRef(null)
  let [open, setOpen] = useState(false)

  return {
    buttonProps: {
      ref: buttonRef,
      onClick() {
        setOpen(true)
      },
    },
    dialogProps: {
      open,
      setOpen: useCallback(
        (open) => {
          let { width = 0, height = 0 } =
            buttonRef.current?.getBoundingClientRect() ?? {}

          if (!open || (width !== 0 && height !== 0)) {
            console.log('open the search')
            setOpen(open)
          }
        },
        [setOpen],
      ),
    },
  }
}

export function Search() {

  let [modifierKey, setModifierKey] = useState()
  let { buttonProps, dialogProps } = useSearchProps()


  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ',
    )
  }, [])

  return (
    <div className="block lg:block lg:max-w-md lg:flex-auto justify-end">
      <Suspense fallback={null}>
        <SearchDialog className="hidden lg:block" {...dialogProps} />
      </Suspense>
    </div>
  )
}

export function MobileSearch() {
  let { buttonProps, dialogProps } = useSearchProps()

  return (
    <div className="contents lg:hidden">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none lg:hidden dark:hover:bg-white/5"
        aria-label="Find something..."
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5 stroke-zinc-900" />
      </button>
      <Suspense fallback={null}>
        <SearchDialog className="lg:hidden" {...dialogProps} />
      </Suspense>
    </div>
  )
}