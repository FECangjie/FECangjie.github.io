import { React } from 'zola'


export default class extends React.Component{
	componentWillMount(){
		const comFn = this.props.comFn
		comFn.then((Component) =>{
			this.renderComponent = Component.default ? Component.default:Component
			this.forceUpdate()
		})
	}
	componentWillUnmount() {
		this.renderComponent = null
	}
	render(){
		// if(!this.renderComponent){
		// 	return null
		// }
		const renderComponent = this.renderComponent || 'div'
		console.log(renderComponent)
		return React.createElement(renderComponent, {}, [])
	}
}
