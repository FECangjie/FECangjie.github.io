import { React } from 'zola'
import './markdown.styl'

export default class extends React.Component{
	componentWillMount(){
		const Component = this.props.com
		this.renderComponent = Component.default ? Component.default : Component
		console.log(this.renderComponent)
		this.forceUpdate()
	}
	componentWillUnmount() {
		this.renderComponent = null
	}
	render(){
		const renderComponent = this.renderComponent || 'div'
		return React.createElement(renderComponent, {}, [])
	}
}
