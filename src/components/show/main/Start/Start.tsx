"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./Start.module.scss";
import './Start.css'
import '@material/web/textfield/filled-text-field'
import '@material/web/select/filled-select'
import '@material/web/select/select-option'
import '@material/web/button/text-button'
import '@material/web/button/filled-tonal-button'
import '@material/web/button/outlined-button'
import '@material/web/button/filled-button'
import '@material/web/checkbox/checkbox'
import Api from "@/app/api/api";
import CreateConfig from "@/app/api/class/create-config";
import {AppTools} from "@/utils/AppTools";
import DataService from "@/app/service/data-service";
import {clsx} from "clsx";
import {useSnapshot} from "valtio";
import {func} from "prop-types";

export default function Start () {
  function onFirstEnter() {
  }
  function onFirstEffect() {
  }

  const firstEnter = useRef<boolean>(true)
  if (firstEnter.current) {
    firstEnter.current = false
    onFirstEnter()
  }
  const firstEffect = useRef<boolean>(true)
  useEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false
      onFirstEffect()
    }
  }, [])

  const configSnap = useSnapshot(DataService.config)

  const [questionnaire, setQuestionnaire] = useState(configSnap.args[4][0])
  const [agentType, setAgentType] = useState(configSnap.args[0][0])
  const [agentLLM, setAgentLLM] = useState(configSnap.args[1][0])
  const [repeatTimes, setRepeatTimes] = useState(configSnap.args[3][0])
  const [evalMethod, setEvalMethod] = useState(configSnap.args[2][0])

  function addData(data: any) {
    console.log(data)
  }

  function start() {
    const folderUrl = `/results/final/${questionnaire}_agent-type=${agentType}_agent-llm=${agentLLM}_eval-method=${evalMethod}_repeat-times=${repeatTimes}/`
    let allNum = 0
    let successNum = 0
    let failNum = 0
    for (const file of DataService.config.files) {
      allNum++
      const url = folderUrl + file
      try {
        fetch(url).then((response) => {
          if (response.status === 200){
            response.json().then(data => {
              addData(data)
              successNum++
            }).catch(e => {
              failNum++
            })
          } else {
            failNum++
          }
        }).catch(e => {
          failNum++
        })
      } catch (e) {
        failNum++
      }
    }
  }


  return (
    <div className={clsx(styles.Start, 'm3-hook')}>
      <h1>Select Experiment</h1>
      <div className={styles.fieldLine}>
        <md-filled-select label={'Questionnaire'} size={'large'} value={questionnaire} onInput={(e: any) => {
          setQuestionnaire(e.target.value)
        }}>
          {
            configSnap.args[4].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
        <md-filled-select label={'Agent Type'} size={'large'} value={agentType} onInput={(e: any) => {
          setAgentType(e.target.value)
        }}>
          {
            configSnap.args[0].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
      </div>
      <md-filled-select label={'Eval Method'} size={'large'} value={evalMethod} onInput={(e: any) => {
        setEvalMethod(e.target.value)
      }}>
        {
          configSnap.args[2].map((t, i) => {
            return <md-select-option key={i} value={t}>
              <div slot="headline">{t}</div>
            </md-select-option>
          })
        }
      </md-filled-select>
      <div className={styles.fieldLine}>
        <md-filled-select label={'Agent LLM'} size={'large'} value={agentLLM} onInput={(e: any) => {
          setAgentLLM(e.target.value)
        }}>
          {
            configSnap.args[1].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
        <md-filled-select label={'Repeat Times'} size={'large'} value={repeatTimes} onInput={(e: any) => {
          setRepeatTimes(e.target.value)
        }}>
          {
            configSnap.args[3].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
      </div>
      <div className={styles.line} style={{marginTop: '10px'}}>
        <md-text-button trailing-icon>
          Reset
          {/*<svg slot="icon" viewBox="0 0 48 48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"/></svg>*/}
        </md-text-button>
        <div className={styles.space}/>
        <md-filled-tonal-button onClick={() => start()}>
          Continue
          {/* @ts-ignore */}
          <svg slot="icon" viewBox="0 0 48 48"><path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/></svg>
        </md-filled-tonal-button>
      </div>
    </div>
  )
}
