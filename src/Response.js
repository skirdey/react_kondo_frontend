import React from 'react';

function Response(props) {

    if (props.response.error){
        return (
            <p className="error">
                <span className="label">Try again</span> { props.response.error }.
            </p>
        );
    } else {
        const { outputA, outputB } = props
        const { sentence_meta } = props.response;
        const { angle, levenshtein_distance, same_bucket } = sentence_meta;

        return (
            <div>
                <p>
                    <span className="label">sentence-one</span>  { outputA }
                    <br />
                    <span className="label">sentence-two</span> { outputB }
                </p>

                <ul className="response">
                    <li>same_bucket: <span>{ JSON.stringify(same_bucket) }</span></li>
                    <li>levenshtein_distance: <span>{ levenshtein_distance }</span></li>
                    <li>angle: <span>{ angle }</span></li>
                </ul>
            </div>
        );
    }
}

export default Response;