import ProgressBar from 'react-bootstrap/ProgressBar';

function customProgressBar({{barLabel} , {levelPercent}}) {
    const label = barLabel
    return(
        <ProgressBar now={label} label = {`XP: ${levelPercent}%`}/>
    )
}