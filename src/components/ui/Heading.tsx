interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div className="">
			<h1 className='text-3xl font-medium 
			 max-w-[200px]
			 xs:max-w-[100%]'>{title}</h1>
			<div className='my-3 h-0.5 bg-border w-full' />
		</div>
	)
}
