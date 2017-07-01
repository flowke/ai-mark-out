import S from './style.scss';
import {Image, List} from 'semantic-ui-react';

import {hintFinish} from 'common/util/Util.js';
export default function Img({url, photo, active, switchPhoto, selectShape, shouldFinish}){
    let inActive = active ? S.active : '';
    return (
        <List.Item className={`${inActive} ${S.imgWrap}`}
            onClick={ev=>{
                switchPhoto(photo);
                selectShape( null, true );
            }}
        >
            <Image src={photo.url} size="tiny" className={S.img}/>
        </List.Item>
    );
}
