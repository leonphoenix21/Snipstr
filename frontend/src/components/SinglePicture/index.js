import { useParams } from 'react-router-dom';
import './SinglePicture.css';

const SinglePicture = ({ pictures }) => {
    // pictures.map(picture => {
    //     console.log('aaaaaaaaaaaaaaaa', picture)
    // })
    const { id } = useParams();
    // console.log("mmmmmmmmmmmmmmmmmmmmmmm", pictures)
    // const singlePicture = pictures.filter(picture => { picture.id === +id });

    return (
        null
        // <div>
        //     <h1>{singlePicture?.name}</h1>
        //     <img
        //         src={singlePicture?.url}
        //         alt={singlePicture?.name}
        //     />
        // </div>
    )

}
export default SinglePicture;