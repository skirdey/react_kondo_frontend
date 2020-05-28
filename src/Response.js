import React, { Component } from 'react';

function Response(props) {

    if (props.response.error){
        return (
            <p>{ props.response.error }</p>
        );
    } else {
        const { sentence_meta } = props.response;
        const { angle, count, levenshtein_distance, same_bucket } = sentence_meta;

        return (
            <div>
                <ul className="response">
                    <li>angle: <span>{ angle }</span></li>
                    <li>count: <span>{ count }</span></li>
                    <li>levenshtein_distance: <span>{ levenshtein_distance }</span></li>
                    <li>same_bucket: <span>{ JSON.stringify(same_bucket) }</span></li>
                </ul>
            </div>
        );
    }
}

export default Response;