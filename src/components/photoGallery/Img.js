
function switchPhoto(id, cb) {

}

export default function Img({url, photo, active, switchPhoto}){
    let inActive = active ? 'active' : '';
    return (
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3">
            <div
                className={`thumbnail ${inActive}`}
                onClick={ev=>{switchPhoto(photo)}}
            >
                <img src={photo.url}/></div>
        </div>
    );
}
