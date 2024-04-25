import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function FollowModal({ array, type }: { array: any[]; type: string }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <span
                style={{
                    fontSize: 20,
                    fontWeight: 500,
                }}
                onClick={handleShow}
                className=""
            >
                <span
                    className="follow-nums"
                    style={{
                        marginRight: 5,
                    }}
                >
                    {array.length}
                </span>
                <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                    {type}
                </span>
            </span>

            <Modal
                show={show}
                onHide={handleClose}
                data-bs-theme="dark"
                style={{ marginTop: 80 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{type}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: 400 }}>
                    {array && array.length > 0 && (
                        <div className="users">
                            {array.map((user: any) => (
                                <>
                                    <Link
                                        to={`/profile/${user._id}`}
                                        onClick={handleClose}
                                        className="btn btn-secondary"
                                        style={{
                                            fontWeight: 500,
                                            fontSize: 16,
                                            marginRight: 10,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {user.username}
                                    </Link>
                                </>
                            ))}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FollowModal;
