
import TopHeaderInteractive from './TopHeaderInteractive'

const TopHeader = ({ header }) => {
  
	return (
    <TopHeaderInteractive logo={header?.logo} links={header?.links} />
	)
}

export default TopHeader
