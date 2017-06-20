import S from './style.scss';
import {connect} from 'react-redux';
let {Stage, Layer, Circle, Line, Image} = KV;
import {
    fitStageIntoParentContainer,
    drawImgCenter,
    getRectToImg
} from 'util/KonvaUtil';
import PaintingLayer from './PaintingLayer';
import * as actionCreators from './BoardRedux';

export default class PaintingGroup extends Component{
    constructor(props){
        super(props);

        this.stageWidth = 760;
        this.stageHeight = 500;

        this.calcParm = {};

        this.getPointerPosition = this.getPointerPosition.bind(this);
        this.mark = this.mark.bind(this);

    }

    getPointerPosition(){

        return this.refs.stage.getStage().getPointerPosition();
    }

    // end 对某个 layer 的修改

    mark(){

        let {layersData, curtTag} = this.props;
        if(!curtTag) return;

        let {addSpot, closeLine} = this.props;

        let layer = layersData[curtTag];




        if(layer.closed) return;

        if(layer.firstSpotHit){
            closeLine(curtTag);

        }else{

            let {x,y} = this.getPointerPosition();
            addSpot(x,y, this.calcParm, curtTag);
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

        // console.log(this.props);
        let { layersData, image, addSpot, closeLine, fixFirstSpotHit, curtTag} = this.props;

        let layerComp = null;

        if(curtTag){
            let layer = layersData[curtTag];

            let {points, fill, closed, id} = layer;

            layerComp = (
                <PaintingLayer
                    {...{
                        points,
                        fill: fill,
                        closed,
                        id,
                        fixFirstSpotHit,
                        curtTag
                    }}

                />
            );
        }

        let {stageWidth, stageHeight} = this;

        let bodyInfo = {x: 0, y: 0, width: 0, height: 0};

        if(image){

            let {width: imgWidth, height: imgHeight} = image;

            let {x, y, w, h, scale} = drawImgCenter(imgWidth, imgHeight, stageWidth, stageHeight);
            bodyInfo = {x,y,width: w, height: h};

            this.calcParm = {x, y, scale};

        }


        return (
            <div
                ref="stageContainer"
                className="stageContainer"
                style={{width: '100%', height: '100%'}}
            >
                <Stage
                    onClick={this.mark}
                    ref="stage"
                    {...{
                        width: stageWidth,
                        height: stageHeight
                    }}
                >
                    <Layer>
                        <Image
                            {...bodyInfo}
                            {...{
                                image,
                                stroke: 'red',
                                strokeWidth: 4
                            }}
                        />
                    </Layer>
                    {layerComp}
                </Stage>
            </div>
        );
    }
}
