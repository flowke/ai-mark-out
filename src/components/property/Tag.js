
import S from './style.scss';

export default function Tag({id, tagName, curtPhotoID, switchTag, active}){

    return (
        <div className={active ? S.active : ''}
            onClick={ev=>switchTag(curtPhotoID, id)}
        >{tagName}</div>
    );
}
