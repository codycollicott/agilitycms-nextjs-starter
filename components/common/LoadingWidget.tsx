interface Props {
	message: string
}

const Widget = ({message}: Props) => {
	return (
		<section className="flex flex-col items-center justify-center h-screen">
			<p>{message}</p>
		</section>
	)
}

export default Widget
