export default function createImageLink(path){
    const NODE_BACKEND_URL = 'http://localhost:6200';
    const pathParts = path.split('/');
    if(pathParts[0] === 'public'){
        pathParts.splice(0,1);
        path = pathParts.join('/');
    }
    path = path.replace('public/','/'); 
    return `${NODE_BACKEND_URL}/${path}`;
}