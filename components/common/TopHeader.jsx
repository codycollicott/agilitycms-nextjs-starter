
import TopHeaderInteractive from './TopHeaderInteractive'

const TopHeader = ({ header, isScrolledLive }) => {
  
	return (
    <TopHeaderInteractive isScrolledLive={isScrolledLive} logo={header?.logo} links={header?.links} />
	)
}

export default TopHeader
