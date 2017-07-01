
const { Image, Layer, Line, Circle, Canvas, Group } = KV;

export default class PaintingLayer extends Component{
    constructor(props){
        super(props);

        this.curtCircle = null;

        let canvas = this.canvas = document.createElement('canvas');
        canvas.width = props.stageWidth;
        canvas.height = props.stageHeight;

    }


    render(){

        let {
            points, fill, closed, layerID, curtTag, pointMove, fixFirstSpotHit, lineColor, calcParm,
            stageWidth, stageHeight, overPointIndex, shape, moveShape, fixShapeFill, selectedTag, selectShape, shapeType, fixLayerHold, getPointerPosition
        } = this.props;

        let linePoints = [];

        points.forEach(elt=>{
            linePoints.push(elt.x, elt.y);
        });

        let pointsComp = null;

        if(layerID === curtTag || layerID === selectedTag){
            pointsComp = points.map((point, i)=>{

                let {x, y} = point;

                return (
                    <Circle
                        key={i}
                        ref={`Circle${i}`}
                        onMouseOver={ ev => {
                            if(shape===0 && i===0){
                                fixFirstSpotHit(true, i);

                            }else{
                                fixFirstSpotHit(false, i);
                            }

                        }}

                        onMouseOut={ev => {
                            fixFirstSpotHit(false, null);

                        }}

                        {...{
                            x,
                            y,
                            radius: overPointIndex===i ? 8 : 6,
                            fill: overPointIndex ===0 && i===0 && !closed ? null:'#fff',
                            // fill: overPointIndex ===0 && i===0 && !closed ? null:'#000000',
                            stroke: i===0?  '#ff0000' : 'black',
                            strokeWidth: 3,
                            draggable: true
                        }}

                        onDragMove={ev=>{
                            let {x,y} = ev.target.attrs;

                            if(x<4 || x > (stageWidth -4) || y<4 || y > (stageHeight-4)) return;
                            pointMove( i, x, y, calcParm);
                            if(shapeType===1){
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

                        }}
                        dragBoundFunc={
                            ({x, y})=>{

                                if(x<4){
                                    x=4;
                                }

                                if(x>stageWidth-4){
                                    x=stageWidth-4;
                                }

                                if(y<4){
                                    y=4;
                                }

                                if(y>stageHeight-4){
                                    y=stageHeight-4;
                                }

                                return {
                                    x, y
                                }
                            }
                        }
                    />
                );
            });
        }else{
            pointsComp = null;
        }

        return (
            <Layer>
                {
                    selectedTag? (
                        <Image
                            {...{
                                    width: stageWidth,
                                    height: stageHeight,
                                    // image: this.canvas
                                    // fill: 'red'
                            }}
                            onMouseMove={ev=>{
                                // console.log(ev.target.className);
                                if(!this.offsetDistence) return;
                                moveShape(this.offsetDistence, getPointerPosition(), layerID);
                            }}
                        />
                    ) : null
                }
                <Line
                    {...{
                            points:linePoints,
                            stroke: lineColor,
                            strokeWidth: 4,
                            lineJoin: 'round',
                            closed,
                        fill : fill || selectedTag ===layerID ? 'rgba(255,0,0,0.3)': null ,
                        listening: selectedTag ===layerID ? true : false
                    }}
                    // onMouseOver={ev=>{
                    //     // fixShapeFill(true, layerID)
                    // }
                    // }
                    // onMouseOut={ev=>fixShapeFill(false, layerID)}
                    // onClick={ev=>{
                    //
                    //     selectShape(layerID);
                    // }}

                    onMouseDown={ev=>{
                        let pos = getPointerPosition();
                        this.offsetDistence = points.map(point=>{
                            return {
                                    x: pos.x-point.x,
                                    y: pos.y-point.y
                            }
                        });
                            // console.log(this.offsetDistence);
                    }}

                    onMouseUp={ev=>{
                            this.offsetDistence = null;
                    }}

                    onDblClick={
                        ev=>{
                            fixLayerHold(layerID)
                        }
                    }
                    onMouseMove={ev=>{
                        if(!this.offsetDistence) return;
                        moveShape(this.offsetDistence, getPointerPosition(), layerID);
                    }}
                />

                {/* <Line
                    {...{
                        points:[...linePoints, linePoints[0], linePoints[1]],
                        stroke: 'red',
                        strokeWidth: 14,
                        opacity: 0
                    }}
                    onMouseOver={ev=>{
                        fixShapeFill(true, layerID);
                                    // console.log('over');
                    }}
                    onMouseOut={ev=>fixShapeFill(false, layerID)}
                    onClick={ev=>{

                        if(selectedTag) return;

                        selectShape(layerID);
                    }}
                    onDblClick={
                        ev=>{
                            fixLayerHold(layerID)
                        }
                    }
                /> */}

                {
                    closed? (
                        <Line
                            {...{
                                    points:[...linePoints, linePoints[0], linePoints[1]],
                                    stroke: 'red',
                                    strokeWidth: 14,
                                    opacity: 0
                            }}
                            onMouseOver={ev=>{
                                fixShapeFill(true, layerID);
                                    // console.log('over');
                            }}
                            onMouseOut={ev=>fixShapeFill(false, layerID)}
                            onClick={ev=>{

                                selectShape(layerID);
                            }}
                            onDblClick={
                                ev=>{
                                    fixLayerHold(layerID)
                                }
                            }
                        />
                    ) : null
                }

                {pointsComp}

            </Layer>
        );
    }
}
