
import S from './style.scss';
import { hintFinish } from 'common/util/Util.js';
export default function Tag({id, tagName, active, selectShape, fixLayerHold, fixShapeFill}){

    return (
        <div className={active ? S.active : ''}
            onClick={ev=>{
                selectShape(id);
            }}
            onDoubleClick={ev=>{
                fixLayerHold(id);
            }}
            onMouseOver={ev=>fixShapeFill(true, id)}
            onMouseOut={ev=>fixShapeFill(false, id)}
        >{tagName}</div>
    );
}
