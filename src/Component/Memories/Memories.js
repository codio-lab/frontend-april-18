import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getMemories, deleteMemory } from "../../action/memories";
import logo from "../../assets/3.png";
import Loader from "../Loader/Loader";

function Memories(props) {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { memoryData } = props;
    if (memoryData && memoryData.length > 0) setMemories(memoryData);
    else getAllMemories();
  }, []);

  const getAllMemories = () => {
    setLoading(true);
    props
      .getMemories()
      .then((resp) => {
        if (resp) {
          setMemories(resp);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const editHandler = (item) => {
    const { history } = props;
    history &&
      history.push({
        pathname: "/Create",
        state: item,
      });
  };

  const deleteHandler = (item) => {
    const { _id } = item;
    setLoading(true);
    props.deleteMemory(_id).then((resp) => {
      if (resp && resp._id === _id) {
        getAllMemories();
      }
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="card-container">
        {memories && memories.length > 0
          ? memories.map((memory) => (
              <div className="card" style={{ width: "18rem" }}>
                <div
                  onClick={() => {
                    props.history.push(`/Memories/${memory._id}`);
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={memory.image || logo}
                    className="_image"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{memory.title}</h5>
                  <p className="card-text">{memory.post}</p>
                  <div className="text-right">
                    <small className="text-muted ">
                      Author <cite title="Source Title">{memory.author}</cite>
                    </small>
                  </div>
                  <div className="card-buttons">
                    <Button
                      type="button"
                      disable={loading}
                      className="btn btn-primary"
                      onClick={() => editHandler(memory)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      disable={loading}
                      className="btn btn-danger mx-3"
                      onClick={() => deleteHandler(memory)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

const mapDispatchToProps = {
  getMemories,
  deleteMemory,
};
const mapStateToProps = (state) => ({ memoryData: state.storeMemoryInStore });

export default connect(mapStateToProps, mapDispatchToProps)(Memories);
