import axios from 'axios'
import { toast } from 'react-toastify'
import icon from '../../assets/img/notification-icon.svg'
import { BASE_URL } from '../../utils/request'
import './styles.css'

type Props = {
    saleId: number
}

function handleClick( id : number){
    //axios make a request to backend on sales route / id / notification to send the message with sale data
    axios.get(`${BASE_URL}/sales/${id}/notification`)
        .then(response => {
            toast.info("SMS enviado com sucesso");
        });
}
//receiving the sale id as a prop
function NotificationButton({saleId} : Props) {
    return (
        <>
            {/* on click the button, trigger the function handleClick passing the sale id*/}
            <div className="dsmeta-red-btn" onClick={() => handleClick(saleId)}>
                <img src={icon} alt="Notificar"/>
            </div>
        </>
    )
};

export default NotificationButton;