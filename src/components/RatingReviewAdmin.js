import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

import StarRatings from "react-star-ratings";

const RatingReviewAdmin = ({ history }) => {
  const [reviewData, setReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewTotal, setReviewTotal] = useState();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editFormData, setEditFormData] = useState({
    _id: "",
    rating: "",
    reviewDescription: "",
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };

  useEffect(() => {
    if (userInfo?.isAdmin === false) {
      history.push("/");
    }
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      axios
        .get(`${process.env.REACT_APP_PROXY_URL}/api/review/get-all-review`, config)
        .then((val) => {
          setReviewData(val?.data?.reviews);
          setReviewTotal(val?.data?.total);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    const { _id, rating, reviewDescription } = reviewData[index];
    setEditFormData({ _id, rating, reviewDescription });
  };

  const handleEdit = () => {
    axios
      .put(
        `${process.env.REACT_APP_PROXY_URL}/api/review/update-review/${editFormData?._id}`,
        {
          rating: editFormData?.rating,
          reviewDescription: editFormData?.reviewDescription,
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(reviewData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reviewData.csv";
    link.click();
  };

  const convertToCSV = (reviews) => {
    const headers = [
      "Author",
      "Comment",
      "Product",
      "Date",
      "Rating",
      "Status",
    ];
  
    const rows = reviews.map((values) => {
      const author =
        values?.firstName +
        " " +
        values?.lastName +
        " (" +
        values?.userData[0]?.email +
        ") - " +
        (values?.purchased === true ? "Purchased" : "Not Purchased");
        const comment = `"${values?.reviewDescription.replace(/"/g, '""')}"`;
      const product = values?.productData[0]?.name.replace(/(\r\n|\n|\r)/gm, ' ');
      const date = moment(values?.createdAt).format("DD-MMM-YYYY hh:mm A");
      const rating = values?.rating;
      const status = values?.status.replace(/(\r\n|\n|\r)/gm, ' ');
  
      return [
        `"${author}"`,
        comment,
        `"${product}"`,
        `"${date}"`,
        rating,
        `"${status}"`,
      ].join(",");
    });
  
    return [headers.join(","), ...rows].join("\n");
  };
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentRecords = reviewData.slice(indexOfFirstPost, indexOfLastPost);
  const nPage = Math.ceil(reviewData.length / postsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const PrevPage = () => {
    if (currentPage !== 1) {
      console.log("clicked");
      setCurrentPage(currentPage - 1);
    }
  };
  const NextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCpage = (i) => {
    setCurrentPage(i);
  };
  const FirstPage = () => {
    setCurrentPage(1);
  };
  const LastPage = () => {
    setCurrentPage(nPage);
  };




  
  return (
    <>
      <div className="container" style={{ marginTop: 100 }}>
        <h1 style={{ marginTop: "50px" }} className="productListPage_heading">
          Review List ({`${reviewTotal || 0}`})
        </h1>

        <div className="download-csv">
          <FontAwesomeIcon
            onClick={handleDownloadCSV}
            icon={faFileExport}
            style={{ color: "orange", cursor: "pointer", fontSize: "25px" }}
          />
         
        </div>

        <Table bordered className="table-xl">
          <thead>
            <tr className="fw-bold fs-5" style={{ border: "2px solid #111" }}>
              <th scope="col">Author</th>
              <th scope="col">Comment</th>
              <th scope="col">Product </th>
              <th scope="col">Date</th>
              <th scope="col">Rating</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
          {currentRecords &&
              currentRecords?.map((values, index) => {
                const color =
                  values?.status === "pending"
                    ? "#ffffe0"
                    : values?.status === "approved"
                    ? ""
                    : "#ffcccb";

                return (
                  <tr
                    style={{
                      backgroundColor: color,
                      padding: "10px",
                      border: "2px solid #111",
                    }}
                    key={values._id}
                  >
                    <td>
                      {values?.firstName} {values?.lastName}
                      <br />
                      {values?.userData[0]?.email}
                      <br />
                      ({values?.purchased === true
                        ? "Purchased"
                        : "Not Purchased"}
                      )
                    </td>

                    <td>
                      {values?.reviewDescription}
                      <br />

                      {values?.status === "pending" ? (
                        <>
                          <div className="mt-1 mx-auto">
                            <a
                              className="text-primary "
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const userConfirm = window.confirm(
                                  "Are you sure you want to approve this review? "
                                );
                                if (userConfirm) {
                                  axios
                                    .post(
                                      `${process.env.REACT_APP_PROXY_URL}/api/review/approve-review-admin`,
                                      {
                                        reviewId: values._id,
                                        approved: true,
                                      },
                                      config
                                    )
                                    .then((res) => {
                                      if (res) {
                                        window.location.reload(false);
                                      }
                                    });
                                }
                              }}
                            >
                              Approve
                            </a>

                            <a
                              className="text-primary px-4"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const userConfirmed = window.confirm(
                                  "Are you sure you want to reject this review?"
                                );

                                if (userConfirmed) {
                                  axios
                                    .post(
                                      `${process.env.REACT_APP_PROXY_URL}/api/review/approve-review-admin`,
                                      {
                                        reviewId: values._id,
                                        approved: false,
                                      },
                                      config
                                    )
                                    .then((res) => {
                                      if (res) {
                                        window.location.reload(false);
                                      }
                                    });
                                }
                              }}
                            >
                              Reject
                            </a>

                            <a
                              className="text-primary "
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditClick(index)}
                            >
                              Edit
                            </a>
                            <br /> <br />

                            {editingIndex === index ? (
                              <div>
                                <div class="mb-3 ">
                                  <form>
                                    <label
                                      for="rating"
                                      class="form-label"
                                    >
                                      Rating
                                    </label>
                                    <select
                                      className="form-control"
                                      value={editFormData.rating}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          rating: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                    <br></br>
                                    <div className="mb-3">
                                      <label>Comment</label>
                                      <textarea
                                        className="form-control"
                                        value={
                                          editFormData?.reviewDescription
                                        }
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            reviewDescription:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      ></textarea>
                                    </div>

                                    <button
                                      className="btn-edit"
                                      type="submit"
                                      onClick={handleEdit}
                                    >
                                      Save &amp; Approve
                                    </button>
                                    <button
                                      className="btn-cancel"
                                      type="button"
                                      onClick={() =>
                                        window.location.reload()
                                      }
                                    >
                                      Cancel
                                    </button>
                                  </form>
                                </div>
                              </div>
                            ) : (
                              <div> </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>

                    <td>
                      <Link
                        className="text-primary"
                        to={`/product/${values?.productId}`}
                      >
                        {values?.productData[0]?.name}
                      </Link>
                    </td>

                    <td>
                      {moment(values?.createdAt).format(
                        "DD-MMM-YYYY   hh:mm A"
                      )}{" "}
                    </td>
                    <td>
                      <StarRatings
                        rating={values?.rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="3px"
                      />
                    </td>
                    <td> {values?.status} </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <br/>
        <br/>
        {/* bootstrap pagination  */}
        <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop:'20px'
              }}
            >
              <Pagination size="lg">
                <Pagination.First onClick={FirstPage} />
                <Pagination.Prev onClick={PrevPage} />
                <Pagination.Ellipsis />
                {numbers.map((num, i) => (
                  <Pagination.Item key={num}
                   active={num === currentPage}
 
                   onClick={() => changeCpage(num)}>
                    {num}
                  </Pagination.Item>
                ))}
                <Pagination.Ellipsis />
                <Pagination.Next onClick={NextPage} />
                <Pagination.Last onClick={LastPage} />
              </Pagination>
      </div>
      <br/>
      <br/>

      </div>
    </>
  );
};

export default RatingReviewAdmin;
