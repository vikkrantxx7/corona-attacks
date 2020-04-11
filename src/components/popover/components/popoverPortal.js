const PopoverPortal = (props) => {
    const portalNode = document.getElementById('popover-portal')

    return ReactDOM.createPortal(props.children, portalNode)
}

PopoverPortal.displayName = 'PopoverPortal'

export default PopoverPortal
