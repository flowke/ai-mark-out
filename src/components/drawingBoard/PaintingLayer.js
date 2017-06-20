
const { Image, Layer, Line, Circle } = KV;


export default class PaintingLayer extends Component{
    constructor(props){
        super(props);

        this.state = {
            headCircleStroke: null,
            strokeWidth: 0
        }
        this.headCircleOver = this.headCircleOver.bind(this);
        this.headCircleOut = this.headCircleOut.bind(this);
    }

    headCircleOver(){

        let {curtTag, fixFirstSpotHit} = this.props;

        fixFirstSpotHit(true, curtTag);
        this.setState({
            headCircleStroke: 'grey',
            strokeWidth: 10
        });
    }
    headCircleOut(){
        let {curtTag, fixFirstSpotHit} = this.props;
        this.setState({
            headCircleStroke: null,
            strokeWidth: 0
        });
        fixFirstSpotHit(false, curtTag);
    }

    render(){


        let {points, fill, closed, id, curtTag, fixFirstSpotHit} = this.props;

        let {strockWidth, headCircleStroke} = this.state;

        let {headCircleOver, headCircleOut} = this;

        let spots = null;

        points.forEach((elt, i)=>{

            if(!spots) { spots = [] };

            if(i%2 !== 0) return;

            let x = points[i],
                y = points[i+1];

            let circle = (
                <Circle
                    key={i}
                    onMouseOver={ ev => (i===0 ? headCircleOver() : null)}
                    onMouseOut={ev => (i===0 ? headCircleOut() : null)}
                    {...{
                        x,
                        y,
                        radius: 4,
                        fill: 'grey',
                        stroke: i===0 ? headCircleStroke : null,
                        strokeWidth:50
                    }}
                />
            );

            spots.push(circle);
        });

        return (
            <Layer
            >
                <Line
                    {...{
                        points,
                        stroke: 'blue',
                        strokeWidth: 2,
                        lineJoin: 'round',
                        closed,
                        fill
                    }}
                />
                {spots}
            </Layer>
        );
    }
}
