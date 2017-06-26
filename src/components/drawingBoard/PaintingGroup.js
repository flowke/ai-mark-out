import S from './style.scss';
let {Stage, Layer, Circle, Line, Image} = KV;
import {
    drawImgCenter
} from 'util/KonvaUtil';
import {hintFinish, finishFirst} from 'common/util/Util';
import ClosedPrompt from './ClosedPrompt';

import PaintingLayer from './PaintingLayer';
import * as actionCreators from './BoardRedux';

export default class PaintingGroup extends Component{
    constructor(props){
        super(props);

        this.state = {
            prompt: false,
            data: null
        }

        this.stageWidth = 760;
        this.stageHeight = 500;
        // this.stageWidth = 2760;
        // this.stageHeight = 2500;

        this.calcParm = {};

        this.getPointerPosition = this.getPointerPosition.bind(this);
        this.mark = this.mark.bind(this);

        this.clickTime = 0;
    }

    getPointerPosition(){

        return this.refs.stage.getStage().getPointerPosition();
    }

    // end 对某个 layer 的修改

    mark(ev){
        let {layersGroup:{layers, curtTag, selectedTag, holdingLayerID}, shape, addSpot, closeLine, addTempLayer, fixLayerHold, selectShape} = this.props;

        let layer = layers.reduce( (accu, elt)=>{
            return accu.id===curtTag ? accu : elt;
        }, layers[0]);
        // console.log(selectedTag);
        // if(selectedTag){
        //     selectShape(null);
        //     return;
        // }
        if(layer.closed) return;

        if(holdingLayerID){
            hintFinish();
            return;
        }

        let {x,y} = this.getPointerPosition();

        // x*=stageScale;
        // y*=stageScale;

        if(shape===0){

            if(layer.firstSpotHit && layer.points.length>2){
                // let pointPos = this.getPointerPosition();
                closeLine();
                addTempLayer();
                fixLayerHold(curtTag);
                // console.log(ev);
            }else{
                if(ev.target.className==='Circle') return;
                // let {x,y} = this.getPointerPosition();
                addSpot(x,y, this.calcParm);
            }
        }

        if(shape===1){

            if(ev.target.className==='Circle') return;
            // let {x,y} = this.getPointerPosition();
            addSpot(x,y, this.calcParm);
            addSpot(x,y, this.calcParm);
            addSpot(x,y, this.calcParm);
            addSpot(x,y, this.calcParm);
            closeLine();
        }

    }

    componentWillReceiveProps(nextProps){

    }

    componentDidMount(){
        // let {stageContainer, stage} = this.refs;
        //
        // let {offsetWidth, offsetHeight} = stageContainer;
        //
        // let {stageWidth, stageHeight} = this;
        //
        // let fixStage = this.fixStage = () => fitStageIntoParentContainer(stageContainer, stageWidth, stageHeight, stage);

        // fixStage();

        // window.addEventListener('resize', fixStage);

        // 加载图片

        // imgObj.src = url;

    }

    componentWillUnmount(){
        // window.removeEventListener("resize", this.fixStage);
    }

    render(){

        let {prompt, data} = this.state;

        // console.log(this.props);
        let { layersGroup, image, addSpot, moveShape, closeLine, pointMove, outFirstTime, fixFirstSpotHit, addTempLayer, shape, fixShapeFill, selectShape, alterShapeState, fixLayerHold, redoAPoint, stage, fistTimeUnclose
        } = this.props;

        let {layers, curtTag, selectedTag, holdingLayerID} = layersGroup;

        // console.log(layersGroup);
        let {width: stageWidth, height: stageHeight} = stage;

        let bodyInfo = {x: 0, y: 0, width: 0, height: 0};

        if(image){

            let {width: imgWidth, height: imgHeight} = image;

            let {x, y, w, h, scale} = drawImgCenter(imgWidth, imgHeight, stageWidth, stageHeight);
            bodyInfo = {x,y,width: w, height: h};

            this.calcParm = {x, y, scale};

        }

        let curtlayer = null;
        let holdingLayer = null;
        let selectedLayer = null;
        let selectedLayerIndx = null;

        layers = layers.map((layer, i)=>{
            if(layer.id===curtTag) curtlayer = layer;
            if(holdingLayerID && layer.id===holdingLayerID) holdingLayer = layer;
            if(selectedTag && layer.id===selectedTag) {
                selectedLayer = layer;
                selectedLayerIndx = i;
            };

            let {points, fill, closed, id, lineColor, overPointIndex, shapeType} = layer;
            return (
                <PaintingLayer
                    key={id}
                    {...{
                        points,
                        fill: fill,
                        closed,
                        layerID:id,
                        fixFirstSpotHit,
                        curtTag,
                        lineColor,
                        pointMove,
                        stageWidth,
                        stageHeight,
                        calcParm: this.calcParm,
                        overPointIndex,
                        shape,
                        moveShape,
                        addTempLayer,
                        fixShapeFill,
                        selectedTag,
                        selectShape,
                        shapeType,
                        fixLayerHold,
                        redoAPoint,
                        getPointerPosition: this.getPointerPosition
                    }}

                />
            );
        });

        if(selectedLayer){
            let tempArr = layers.splice(selectedLayerIndx, 1);
            layers = layers.concat(tempArr);
        }

        // console.log(holdingLayer);
        return (
            <div
                ref="stageContainer"
                className="stageContainer"
                style={{position: "relative", width: '800px', height: '100%', overflow: 'auto'}}
            >

                <Stage
                    ref="stage"
                    {...{
                        // scale: {x:stageScale, y: stageScale},
                        width: stageWidth,
                        height: stageHeight
                    }}
                    onMouseDown={ ev=>{
                        let {className} = ev.target;

                        // console.log(selectedTag, className);
                        if(className==='Line' ) return;
                        if(selectedTag &&  (className==='Image') ){
                            selectShape(null);
                            return;
                        }

                        if(shape===0){

                            this.mark(ev);
                        }else{
                            if(this.clickTime===0){
                                this.mark(ev);
                                // console.log('h1');
                                if(!selectedTag && !holdingLayerID){
                                    this.clickTime++;
                                }
                            }else{
                                // console.log(this.clickTime);
                                addTempLayer();
                                // console.log(h2);
                                fixLayerHold(curtTag);
                                if(!selectedTag && !holdingLayerID){
                                    this.clickTime=0;
                                }

                                // outFirstTime();
                            }

                        }
                    } }

                    onMouseMove={
                        ev=>{
                            // console.log(shape, 'shape');

                            if(shape===0) return;
                            if(!curtlayer) return;
                            if(this.clickTime!==1) return;
                            if(holdingLayerID) return;
                            let calcParm = this.calcParm;
                            let {x,y} = this.getPointerPosition();
                            let i = 0 ;
                            if(x<4 || x > (stageWidth -4) || y<4 || y > (stageHeight-4)) return;

                            pointMove( i, x, y, calcParm);
                            if(shape===1){
                                switch (i) {
                                    case 0:
                                        pointMove( 1, null, y, calcParm);
                                        pointMove( 3, x, null, calcParm);
                                        break;
                                    case 1:
                                        pointMove( 0, null, y, calcParm);
                                        pointMove( 2, x, null, calcParm);
                                        break;
                                    case 2:
                                        pointMove( 1, x, null, calcParm);
                                        pointMove( 3, null, y, calcParm);
                                        break;
                                    case 3:
                                        pointMove( 0, x, null, calcParm);
                                        pointMove( 2, null, y, calcParm);
                                        break;
                                    default:

                                }
                            }
                        }
                    }

                >

                    <Layer>
                        <Image
                            {...{
                                width: stageWidth,
                                height: stageHeight
                            }}

                        />
                        <Image
                            {...bodyInfo}
                            {...{
                                image
                            }}
                        />
                    </Layer>
                    {layers}

                </Stage>
                {
                    holdingLayer ? (
                        <ClosedPrompt
                            {...{
                                alterShapeState,
                                fixLayerHold,
                                holdingLayer,
                                holdingLayerID,
                                redoAPoint,
                                fistTimeUnclose,
                                shape
                            }}
                        />
                    ) : null
                }
            </div>
        );
    }
}
