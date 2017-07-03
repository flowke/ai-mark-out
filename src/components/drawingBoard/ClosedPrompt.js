

// alterShapeState,
// fixLayerHold,
// holdingLayer,
// holdingLayerID
import S from './style.scss';
export default class ClosedPrompt extends Component{

    constructor(props){
        super(props);
        this.state={
            tagNameVal: props.holdingLayer.tagName,
            attrVal: props.holdingLayer.attrs
        };
        this.tagNameChange = this.tagNameChange.bind(this);
        this.done = this.done.bind(this);
        this.deleted = this.deleted.bind(this);
        this.redoAPoint = this.redoAPoint.bind(this);
    }

    tagNameChange(ev){
        this.setState({
            tagNameVal: ev.target.value
        });
    }

    done(ev){
        ev.preventDefault();
        ev.stopPropagation();
        let tagName = this.state.tagNameVal;
        let attrs = this.state.attrVal;
        let {alterShapeState, holdingLayerID} = this.props;

        if(!tagName || Number(tagName)===0){
            window.alert('请填写有效标签名');
            return;
        }

        alterShapeState({
            tagName, attrs, layerID: holdingLayerID, isDone: true
        });
    }

    deleted(ev){
        ev.preventDefault();
        ev.stopPropagation();
        let {alterShapeState, holdingLayerID} = this.props;
        alterShapeState({
            layerID: holdingLayerID, isDelete:true
        });
    }
    redoAPoint(){
        let {fistTimeUnclose} = this.props;
        fistTimeUnclose();
    }

    render(){
        let { tagNameVal, attrVal } = this.state;
        let { alterShapeState, holdingLayer,  fixLayerHold, shape, stageWidth, stageHeight } = this.props;
        let { tagNameChange, deleted, done, cancel, redoAPoint } = this;

        let {x: left, y: top} = holdingLayer.points[0];

        left = stageWidth - left > 240 ? left : left - 230,
        top = stageHeight - top > 210 ? top : top - 200;


        return (
            <div className={S.closedPrompt}
                style={{top: top, left:left}}
            >
                <input type="text" placeholder="name" value={tagNameVal}
                    onChange={tagNameChange}
                />
                <textarea className={S.area}
                    cols="30" rows="2" placeholder="attrs" value={attrVal}
                    onChange={ev=>this.setState({attrVal: ev.target.value})}
                ></textarea>
                <button
                    onClick={done}
                >done</button>

                {
                    !holdingLayer.everDone && shape===0 ? (
                        <button
                            onClick={redoAPoint}
                        >undo</button>
                    ) : null
                }

                <button
                    onClick={deleted}
                >delete</button>

                {
                    holdingLayer.everDone ? (
                        <button
                            onClick={ev=>fixLayerHold(null)}
                        >cancel</button>
                    ) : null
                }
            </div>
        );
    }

}
