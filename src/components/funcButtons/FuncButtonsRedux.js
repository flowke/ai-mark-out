

const UNDO = "CANCLE_A_POINT";
const NEXT = "REDO_A_POINT";

export function redoAPoint(layerID) {
    return {
        type: UNDO,
        layerID
    }
}
