import React, {Component} from 'react'
import PageHeader from "./PageHeader"
import TransactionsList from "./TransactionsList"
import Visualization from "./Visualization"
import EmptyState from "./EmptyState"
import Loading from "./Loading"

import { useState, useContext, useEffect } from "react"
import AppHelper from "../../app-helper"
import UserContext from '../../UserContext'

const AppContent = () => {
    const {transactions, setTransactions, pageSelected } = useContext(UserContext)
    
    const [contentState, setContentState] = useState("fetching");
    const [visualizationData, setVisualizationData] = useState("");

    useEffect(() => {

        setContentState("fetching")
        if (pageSelected==="transactions") {
            fetch(`${AppHelper.API_URL}/api/users/transactions/${localStorage.getItem('userId')}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then((response) => response.json())
            .then((transactions) => {
              setTransactions(transactions);
              (transactions.length>0) ? setContentState("not empty") : setContentState("empty");
            });
        } else if (pageSelected==="reports") {

            fetch(`${AppHelper.API_URL}/api/users/get-visualization-data/${localStorage.getItem('userId')}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then((response) => response.json())
            .then((data) => {
                (data.state==="not empty") ? setContentState("not empty") : setContentState("empty")
                setVisualizationData(data)
            });

        }
    
    }, [pageSelected])

    useEffect(() => {
        if (transactions) {
            (transactions.length>0) ? setContentState("not empty") : setContentState("empty");
        }
    }, [transactions])

    let content;
    if (contentState==="fetching") {
        content = <Loading />
    } else if (contentState==="not empty" && pageSelected==="transactions") {
        content = <TransactionsList />
    } else if (contentState==="empty" && pageSelected==="transactions") {
        content = <EmptyState imageFile={"/empty-expenses.svg"} mainText={"You do not have any transaction yet"} />
    } else if (contentState==="not empty" && pageSelected==="reports") {
        content = <Visualization visualizationData={visualizationData} />
    } else if (contentState==="empty" && pageSelected==="reports") {
        content = <EmptyState imageFile={"/empty-report.svg"} mainText={"You do not have any transaction yet"} />
    }
    
    let pageTitle;
    if (pageSelected==="transactions") {
        pageTitle = "Transactions"
    } else if (pageSelected==="reports") {
        pageTitle = "Reports"
    }

    return (
        <div className="app-content-wrapper">
            <div id={'sideNav_wrapper'}>
                <div id={'sideNav'}></div>
            </div>
            <div className="app-content">
                <div id={"content_wrapper"} role="main">
                    <div id={"expensesTable"} className="has-2-columns">
                        <PageHeader pageTitle={pageTitle}/>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppContent;

