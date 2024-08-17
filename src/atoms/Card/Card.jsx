import React from "react";
import PropTypes from "prop-types";

import "./Card.scss";

function Card({ cardImg, cardFooter, children, cardHoverContent, ...otherProps }) {
    const [isFlip, setIsFlip] = React.useState(false);
    return (
        <div
            className={"Card" + (cardHoverContent ? " Card__hoverable" : "")}
            onClick={(e) => {
                e.stopPropagation();
                setIsFlip(cardHoverContent && !isFlip);
            }}
            {...otherProps}
        >
            <div className={"Card_content" + (isFlip ? " hovering" : "")}>
                <div className="Card__header">{cardImg && <div className="Card__img">{cardImg}</div>}</div>
                <div className="Card__container">{children}</div>
                <div className="Card__footer">{cardFooter}</div>
            </div>
            {cardHoverContent && (
                <div className={"Card__hover" + (isFlip ? " hovering" : "")}>
                    <div className="Card__hover__content">{cardHoverContent}</div>
                </div>
            )}
        </div>
    );
}

Card.propTypes = {
    cardImg: PropTypes.node,
    cardHoverContent: PropTypes.node,
    cardFooter: PropTypes.node,
    children: PropTypes.node.isRequired
};

export default Card;
