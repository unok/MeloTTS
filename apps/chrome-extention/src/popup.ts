document.getElementById('save-button')?.addEventListener('click', () => {
  console.log('save-button clicked')
  const apiUrl = (document.getElementById('api-url') as HTMLInputElement)?.value
  const accessToken = (document.getElementById('access-token') as HTMLInputElement)?.value
  chrome.runtime.sendMessage({ action: 'save', data: { apiUrl, accessToken } }, (response) => {
    if (response === undefined) {
      console.log('Response is undefined')
    } else {
      console.log(response)
      if (response.success) {
        alert('Settings saved!')
      }
    }
  })
})

const doLoad = () => {
  chrome.runtime.sendMessage({ action: 'load' }, (response) => {
    console.log(response)
    const apiUrlInput = document.getElementById('api-url') as HTMLInputElement
    const accessTokenInput = document.getElementById('access-token') as HTMLInputElement

    if (apiUrlInput) {
      apiUrlInput.value = response.data.apiUrl
    }
    if (accessTokenInput) {
      accessTokenInput.value = response.data.accessToken
    }
  })
}
document.getElementById('load-button')?.addEventListener('click', () => {
  doLoad()
})

// Load settings on popup open
document.addEventListener('DOMContentLoaded', () => {
  doLoad()
})

document.getElementById("send-html-button")?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => document.documentElement.outerHTML,
        },
        (results) => {
          if (results?.[0]?.result) {
            console.log("HTML of the current tab:", results[0].result)
            alert("HTML of the current tab has been logged to the console.")
          } else {
            console.log("Failed to retrieve HTML.")
          }
        },
      )
    }
  })
})

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ html: html }), // HTML を JSON に変換して送信
        })
        if (response.ok) {
          console.log('HTML sent successfully!')
          alert('HTML sent successfully!')
        } else {
          console.error('Error sending HTML:', response.status)
          alert('Error sending HTML.')
        }
      } catch (error) {
        console.error('Error sending HTML:', error)
        alert('Error sending HTML.')
      }
    } else {
      console.error('API URL or HTML is missing.')
      alert('API URL or HTML is missing.')
    }
  })
}

// ... existing code ...
