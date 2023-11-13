import { useState } from 'react'
import './App.css'

function App() {
  let [checkingIntervalId, setCheckingIntervalId] = useState(0)
  let [refreshingIntervalId, setRefreshingIntervalId] = useState(0)
  let [refreshing, setRefreshing] = useState(false)
  let [checking, setChecking] = useState(false)

  async function startChecking() {
    setChecking(true)
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [checkingIntervalId],
      func: async () => {
        const intervalId = setInterval(async () => {
          const countDownEle = document.getElementsByClassName('countdown-timer')[0]
          const liveDoubtContainer = document.getElementsByClassName('live-doubt-item')[0]
          console.log("running...")
          if (countDownEle) {
            const filePath = 'https://raw.githubusercontent.com/himanshu22500/genInvoice/main/call-to-attention-123107.mp3';
            let beat = await new Audio(filePath)
            await beat.play()
            await setTimeout(() => {
              beat.pause()
            }, 2000);
          } else if (liveDoubtContainer) {
            const filePath = 'https://raw.githubusercontent.com/himanshu22500/genInvoice/main/call-to-attention-123107.mp3';
            let beat = await new Audio(filePath)
            await beat.play()
            await setTimeout(() => {
              beat.pause()
            }, 2000);
          }
        }, 1000);

        checkingIntervalId = intervalId
      }
    });
  }


  async function startRefreshing() {
    setRefreshing(true)
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [refreshingIntervalId],
      func: async () => {
        const intervalId = setInterval(() => {
          const tabsToClick = document.getElementsByClassName('pointer tab ga-event-tracker')
          const randomEle = tabsToClick[(Math.floor(Math.random() * tabsToClick.length))]
          randomEle.click()
          console.log('clicking...')
        }, 15000)
        refreshingIntervalId = intervalId
      }
    });
  }


  async function stopChecking() {
    setChecking(false)
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [checkingIntervalId],
      func: async () => {
        clearInterval(checkingIntervalId)
      }
    });
  }


  async function stopRefreshing() {
    setRefreshing(false)
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [refreshingIntervalId],
      func: async () => {
        clearInterval(refreshingIntervalId)
      }
    });
  }


  return (
    <>
      <div>
        <h1>Check Incomming</h1>
        <button id="startCheck" className={checking?"active-start":""} onClick={startChecking}>Start</button>
        <button id="stopCheck" className="" onClick={stopChecking}>Stop</button>
      </div>
      <div>
        <h1>Refresh</h1>
        <button id="startRefresh" className={refreshing?"active-start":""} onClick={startRefreshing}>Start</button>
        <button id="stopRefresh" className="" onClick={stopRefreshing} >Stop</button>
      </div>
    </>
  )
}

export default App

