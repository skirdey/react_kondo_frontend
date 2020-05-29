import React from 'react';

function Response(props) {

    if (props.response.error){
        return (
            <p>{ props.response.error }</p>
        );
    } else {
        const { outputA, outputB } = props
        const { sentence_meta } = props.response;
        const { angle, levenshtein_distance, same_bucket } = sentence_meta;

        return (
            <div>
                <p>sentence_one: { outputA }</p>
                <p>sentence_two: { outputB }</p>

                <ul className="response">
                    <li>angle: <span>{ angle }</span></li>
                    <li>levenshtein_distance: <span>{ levenshtein_distance }</span></li>
                    <li>same_bucket: <span>{ JSON.stringify(same_bucket) }</span></li>
                </ul>
            </div>
        );
    }
}

export default Response;