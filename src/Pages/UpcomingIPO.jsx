// File: src/pages/UpcomingIPO.jsx
import React from "react";
import "../styles/UpcomingIPO.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faRupeeSign,
  faInfoCircle,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import novaAgriLogo from "./../assets/stock/companies/nova-agri.jpg";
import EPACK from "./../assets/stock/companies/epack.png";
import RKSwamy from "./../assets/stock/companies/rkswamy.png";
import boat from "./../assets/stock/companies/boat.png";
// import OYO from "./../assets/stock/companies/oyo.png"; // File does not exist
import ola from "./../assets/stock/companies/ola.png";
import CLOUDNINE from "./../assets/stock/companies/cloudnine.png"; // Assuming you have a logo for CLOUDNINE
import AppHeader from "../Components/AppHeader";
import Footer from "../Components/Footer";
import { useSearch } from "../Context/SearchContext";

const ipoData = [
  {
    name: "Nova Agritech Ltd.",
    logo: novaAgriLogo,
    priceBand: "Rs 39 – 41",
    open: "2024-01-22",
    close: "2024-01-26",
    issueSize: "143.31 Cr.",
    listingDate: "2024-01-30",
    issueType: "Book Built",
  },
  {
    name: "EPACK Durable Ltd.",
    logo: EPACK,
    priceBand: "Rs 218 – 230",
    open: "2024-01-19",
    close: "2024-01-23",
    issueSize: "640.05 Cr.",
    listingDate: "2024-01-29",
    issueType: "Book Built",
  },
  {
    name: "RK Swamy Ltd.",
    logo: RKSwamy,
    priceBand: "Not issued",
    open: "Not issued",
    close: "Not issued",
    issueSize: "Not issued",
    listingDate: "Not issued",
    issueType: "Book Built",
  },
  // More entries like OYO, boAt, etc.
  // {
  //   name: "OYO STAYS Ltd.",
  //   logo: OYO,
  //   priceBand: "Not issued",
  //   open: "Not issued",
  //   close: "Not issued",
  //   issueSize: "8000 Cr",
  //   listingDate: "Not issued",
  //   issueType: "Book Built",
  // },
  {
    name: "boat .ltd",
    logo: boat,
    priceBand: "Not issued",
    open: "Not issued",
    close: "Not issued",
    issueSize: "Not issued",
    listingDate: "Not issued",
    issueType: "Book Built",
  },
  {
    name: "CLOUDNINE Ltd.",
    logo: CLOUDNINE,
    priceBand: "Not issued",
    open: "Not issued",
    close: "Not issued",
    issueSize: "Not issued",
    listingDate: "Not issued",
    issueType: "Book Built",
  },
  {
    name: "OLA electric Ltd.",
    logo: ola,
    priceBand: "Not issued",
    open: "Not issued",
    close: "Not issued",
    issueSize: "Not issued",
    listingDate: "Not issued",
    issueType: "Book Built",
  },
];

function IPOCard({ ipo }) {
  // Use CSS variables for color toggling
  return (
    <div
      className="ipo-card enhanced-glass fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: 340,
        maxWidth: 350,
        margin: "0 auto",
      }}
    >
      <div className="ipo-logo-wrap" style={{ marginBottom: 12 }}>
        <img src={ipo.logo} alt={ipo.name} className="ipo-logo" />
      </div>
      <div
        className="ipo-content"
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 0.5rem",
        }}
      >
        <h3
          className="ipo-name simple-title"
          style={{
            marginBottom: 8,
            fontSize: "1.22rem",
            color: "var(--text-main)",
            textAlign: "center",
            width: "100%",
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="ipo-icon" />
          <span className="ipo-title-text">{ipo.name}</span>
        </h3>
        <table
          className="ipo-table"
          style={{
            width: "100%",
            margin: "0.5rem 0 0.7rem 0",
            borderRadius: 10,
            overflow: "hidden",
            background: "rgba(255,255,255,0.01)",
            textAlign: "center",
          }}
        >
          <tbody>
            <tr>
              <th
                style={{
                  width: "44%",
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} className="ipo-icon" />{" "}
                Price Band
              </th>
              <td
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                {ipo.priceBand}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="ipo-icon" />{" "}
                Open
              </th>
              <td
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                {ipo.open}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="ipo-icon" />{" "}
                Close
              </th>
              <td
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                {ipo.close}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                Issue Size
              </th>
              <td
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                {ipo.issueSize}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                Type
              </th>
              <td
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                {ipo.issueType}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="ipo-icon" />{" "}
                Listing
              </th>
              <td
                style={{
                  color: "var(--text-main)",
                  textAlign: "center",
                }}
              >
                {ipo.listingDate}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          className="ipo-buttons"
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "0.7rem",
          }}
        >
          <button className="rhp simple-btn" style={{ minWidth: 70 }}>
            <FontAwesomeIcon icon={faFileAlt} /> RHP
          </button>
          <button className="drhp simple-btn" style={{ minWidth: 70 }}>
            <FontAwesomeIcon icon={faFileAlt} /> DRHP
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingIPO() {
  const { search } = useSearch();
  const filteredIpoData = ipoData.filter((ipo) =>
    ipo.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <AppHeader />
      <div className="upcoming-ipo-page">
        <h2 className="heading">Upcoming IPO</h2>
        <p className="subtext">
          Companies that have filed for an IPO with SEBI.
        </p>
        <div className="ipo-grid">
          {filteredIpoData.length === 0 ? (
            <div className="no-results">No IPOs found.</div>
          ) : (
            filteredIpoData.map((ipo, i) => <IPOCard key={i} ipo={ipo} />)
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
