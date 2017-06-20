

export default class ToolBox extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 tool">
                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-info"><span className="fa fa-pencil"></span> <span className="hidden-sm hidden-xs">名称</span></button>
                    <button type="button" className="list-group-item list-group-item-info"><span className="fa fa-photo"></span> <span className="hidden-sm hidden-xs">名称</span></button>
                    <button type="button" className="list-group-item list-group-item-info"><span className="fa fa-reorder"></span> <span className="hidden-sm hidden-xs">名称</span></button>
                    <button type="button" className="list-group-item list-group-item-info"><span className="fa fa-circle-o-notch"> </span><span className="hidden-sm hidden-xs">名称</span></button>
                </div>
            </div>
        );
    }
}
