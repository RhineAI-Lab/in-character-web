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
import {allow} from "@/app/service/data/results";
import Round from "@/app/service/class/round";

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

  const [questionnaire, setQuestionnaire] = useState(allow[0].value)
  const [agentType, setAgentType] = useState(allow[0].list[0].value)
  const [agentLLM, setAgentLLM] = useState(allow[0].list[0].list[0].value)
  const [evalMethod, setEvalMethod] = useState(allow[0].list[0].list[0].list[0].value)
  const [assessorLLM, setAssessorLLM] = useState(allow[0].list[0].list[0].list[0].list[0].value)
  const [repeatTimes, setRepeatTimes] = useState(allow[0].list[0].list[0].list[0].list[0].list[0].value)

  function start() {
    DataService.data.rounds = [
      Round.OverviewRound(),
    ]
    const eval_method_mapping: any = {
      'Self Reported': 'choose',
      'Self Reported - CoT': 'choosecot',
      'Option Conversion': 'interview_convert',
      'Dimensional-Specific Option Conversion': 'interview_convert_adjoption_anonymous',
      'Expert Rating - Batch': 'interview_assess_batch_anonymous',
      'Expert Rating': 'interview_assess_collective_anonymous'
    }
    const folderUrl = `/results/final/${questionnaire}_agent-type=${agentType}_agent-llm=${agentLLM}_eval-method=${eval_method_mapping[evalMethod]}-${assessorLLM}_repeat-times=${repeatTimes}/`
    let allNum = 0
    let successNum = 0
    let failNum = 0

    for (const file of DataService.config.args[6]) {
      allNum++
      const url = folderUrl + file
      try {
        fetch(url).then((response) => {
          if (response.status === 200){
            response.json().then(data => {
              console.log(file, data)
              DataService.loadFromResult(data, file)
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

  const updateQuestionnaire = (v: string) => {
    setQuestionnaire(v)

    const i0 = allow.findIndex(data => {
      return data.value == v
    })

    DataService.config.args[1] = allow[i0].list.map(data => data.value)
    let i1 = allow[i0].list.findIndex(data => {
      return data.value == agentType
    })
    if (i1 == -1) i1 = 0
    setAgentType('')
    setTimeout(() => setAgentType(allow[i0].list[i1].value), 1)

    DataService.config.args[2] = allow[i0].list[i1].list.map(data => data.value)
    let i2 = allow[i0].list[i1].list.findIndex(data => {
      return data.value == agentLLM
    })
    if (i2 == -1) i2 = 0
    setAgentLLM('')
    setTimeout(() => setAgentLLM(allow[i0].list[i1].list[i2].value), 1)

    DataService.config.args[3] = allow[i0].list[i1].list[i2].list.map(data => data.value)
    let i3 = allow[i0].list[i1].list[i2].list.findIndex(data => {
      return data.value == evalMethod
    })
    if (i3 == -1) i3 = 0
    setEvalMethod('')
    setTimeout(() => setEvalMethod(allow[i0].list[i1].list[i2].list[0].value), 1)

    DataService.config.args[4] = allow[i0].list[i1].list[i2].list[i3].list.map(data => data.value)
    let i4 = allow[i0].list[i1].list[i2].list[i3].list.findIndex(data => {
      return data.value == assessorLLM
    })
    if (i4 == -1) {
      i4 = 0
      setAssessorLLM(allow[i0].list[i1].list[i2].list[i3].list[0].value)
    }

    DataService.config.args[5] = allow[i0].list[i1].list[i2].list[i3].list[i4].list.map(data => data.value)
    let i5 = allow[i0].list[i1].list[i2].list[i3].list[i4].list.findIndex(data => {
      return data.value == repeatTimes
    })
    if (i5 == -1) {
      i5 = 0
      setRepeatTimes(allow[i0].list[i1].list[i2].list[i3].list[i4].list[0].value)
    }

    DataService.config.args[6] = allow[i0].list[i1].list[i2].list[i3].list[i4].list[i5].list
  }

  const updateAgentType = (v: string) => {
    setAgentType(v)

    const i0 = allow.findIndex(data => {
      return data.value == questionnaire
    })

    const i1 = allow[i0].list.findIndex(data => {
      return data.value == v
    })

    DataService.config.args[2] = allow[i0].list[i1].list.map(data => data.value)
    let i2 = allow[i0].list[i1].list.findIndex(data => {
      return data.value == agentLLM
    })
    if (i2 == -1) i2 = 0
    setAgentLLM('')
    setTimeout(() => setAgentLLM(allow[i0].list[i1].list[i2].value), 1)

    DataService.config.args[3] = allow[i0].list[i1].list[i2].list.map(data => data.value)
    let i3 = allow[i0].list[i1].list[i2].list.findIndex(data => {
      return data.value == evalMethod
    })
    if (i3 == -1) i3 = 0
    setEvalMethod('')
    setTimeout(() => setEvalMethod(allow[i0].list[i1].list[i2].list[0].value), 1)

    DataService.config.args[4] = allow[i0].list[i1].list[i2].list[i3].list.map(data => data.value)
    let i4 = allow[i0].list[i1].list[i2].list[i3].list.findIndex(data => {
      return data.value == assessorLLM
    })
    if (i4 == -1) i4 = 0
    setAssessorLLM('')
    setTimeout(() => setAssessorLLM(allow[i0].list[i1].list[i2].list[i3].list[0].value), 1)

    DataService.config.args[5] = allow[i0].list[i1].list[i2].list[i3].list[i4].list.map(data => data.value)
    let i5 = allow[i0].list[i1].list[i2].list[i3].list[i4].list.findIndex(data => {
      return data.value == repeatTimes
    })
    if (i5 == -1) i5 = 0
    setRepeatTimes('')
    setTimeout(() => setRepeatTimes(allow[i0].list[i1].list[i2].list[i3].list[i4].list[0].value), 1)

    DataService.config.args[6] = allow[i0].list[i1].list[i2].list[i3].list[i4].list[i5].list
  }

  const updateAgentLLM = (v: string) => {
    setAgentLLM(v)

    const i0 = allow.findIndex(data => {
      return data.value == questionnaire
    })

    const i1 = allow[i0].list.findIndex(data => {
      return data.value == agentType
    })

    const i2 = allow[i0].list[i1].list.findIndex(data => {
      return data.value == v
    })

    DataService.config.args[3] = allow[i0].list[i1].list[i2].list.map(data => data.value)
    let i3 = allow[i0].list[i1].list[i2].list.findIndex(data => {
      return data.value == evalMethod
    })
    if (i3 == -1) i3 = 0
    setEvalMethod('')
    setTimeout(() => setEvalMethod(allow[i0].list[i1].list[i2].list[0].value), 1)

    DataService.config.args[4] = allow[i0].list[i1].list[i2].list[i3].list.map(data => data.value)
    let i4 = allow[i0].list[i1].list[i2].list[i3].list.findIndex(data => {
      return data.value == assessorLLM
    })
    if (i4 == -1) i4 = 0
    setAssessorLLM('')
    setTimeout(() => setAssessorLLM(allow[i0].list[i1].list[i2].list[i3].list[0].value), 1)

    DataService.config.args[5] = allow[i0].list[i1].list[i2].list[i3].list[i4].list.map(data => data.value)
    let i5 = allow[i0].list[i1].list[i2].list[i3].list[i4].list.findIndex(data => {
      return data.value == repeatTimes
    })
    if (i5 == -1) i5 = 0
    setRepeatTimes('')
    setTimeout(() => setRepeatTimes(allow[i0].list[i1].list[i2].list[i3].list[i4].list[0].value), 1)

    DataService.config.args[6] = allow[i0].list[i1].list[i2].list[i3].list[i4].list[i5].list
  }

  const updateEvalMethod = (v: string) => {
    setEvalMethod(v)

    const i0 = allow.findIndex(data => {
      return data.value == questionnaire
    })

    const i1 = allow[i0].list.findIndex(data => {
      return data.value == agentType
    })

    const i2 = allow[i0].list[i1].list.findIndex(data => {
      return data.value == agentLLM
    })

    const i3 = allow[i0].list[i1].list[i2].list.findIndex(data => {
      return data.value == v
    })

    DataService.config.args[4] = allow[i0].list[i1].list[i2].list[i3].list.map(data => data.value)
    let i4 = allow[i0].list[i1].list[i2].list[i3].list.findIndex(data => {
      return data.value == assessorLLM
    })
    if (i4 == -1) i4 = 0
    setAssessorLLM('')
    setTimeout(() => setAssessorLLM(allow[i0].list[i1].list[i2].list[i3].list[0].value), 1)

    DataService.config.args[5] = allow[i0].list[i1].list[i2].list[i3].list[i4].list.map(data => data.value)
    let i5 = allow[i0].list[i1].list[i2].list[i3].list[i4].list.findIndex(data => {
      return data.value == repeatTimes
    })
    if (i5 == -1) i5 = 0
    setRepeatTimes('')
    setTimeout(() => setRepeatTimes(allow[i0].list[i1].list[i2].list[i3].list[i4].list[0].value), 1)

    DataService.config.args[6] = allow[i0].list[i1].list[i2].list[i3].list[i4].list[i5].list
  }

  const updateAssessorLLM = (v: string) => {
    setAssessorLLM(v)

    const i0 = allow.findIndex(data => {
      return data.value == questionnaire
    })

    const i1 = allow[i0].list.findIndex(data => {
      return data.value == agentType
    })

    const i2 = allow[i0].list[i1].list.findIndex(data => {
      return data.value == agentLLM
    })

    const i3 = allow[i0].list[i1].list[i2].list.findIndex(data => {
      return data.value == evalMethod
    })

    const i4 = allow[i0].list[i1].list[i2].list[i3].list.findIndex(data => {
      return data.value == v
    })

    DataService.config.args[5] = allow[i0].list[i1].list[i2].list[i3].list[i4].list.map(data => data.value)
    let i5 = allow[i0].list[i1].list[i2].list[i3].list[i4].list.findIndex(data => {
      return data.value == repeatTimes
    })
    if (i5 == -1) i5 = 0
    setRepeatTimes('')
    setTimeout(() => setRepeatTimes(allow[i0].list[i1].list[i2].list[i3].list[i4].list[0].value), 1)

    DataService.config.args[6] = allow[i0].list[i1].list[i2].list[i3].list[i4].list[i5].list
  }

  const updateRepeatTimes = (v: string) => {
    setRepeatTimes(v)

    const i0 = allow.findIndex(data => {
      return data.value == questionnaire
    })

    const i1 = allow[i0].list.findIndex(data => {
      return data.value == agentType
    })

    const i2 = allow[i0].list[i1].list.findIndex(data => {
      return data.value == agentLLM
    })

    const i3 = allow[i0].list[i1].list[i2].list.findIndex(data => {
      return data.value == evalMethod
    })

    const i4 = allow[i0].list[i1].list[i2].list[i3].list.findIndex(data => {
      return data.value == assessorLLM
    })

    const i5 = allow[i0].list[i1].list[i2].list[i3].list[i4].list.findIndex(data => {
      return data.value == v
    })

    DataService.config.args[6] = allow[i0].list[i1].list[i2].list[i3].list[i4].list[i5].list
  }

  return (
    <div className={clsx(styles.Start, 'm3-hook')}>
      <h1>Select Experiment</h1>
      <div className={styles.fieldLine}>
        <md-filled-select label={'Questionnaire'} size={'large'} value={questionnaire} onInput={(e: any) => {
          updateQuestionnaire(e.target.value)
        }}>
          {
            configSnap.args[0].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
        <md-filled-select label={'Agent Type'} size={'large'} value={agentType} onInput={(e: any) => {
          updateAgentType(e.target.value)
        }}>
          {
            configSnap.args[1].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
      </div>
      <div className={styles.fieldLine}>
        <md-filled-select label={'Agent LLM'} size={'large'} value={agentLLM} onInput={(e: any) => {
          updateAgentLLM(e.target.value)
        }}>
          {
            configSnap.args[2].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
        <md-filled-select label={'Eval Method'} size={'large'} value={evalMethod} onInput={(e: any) => {
          updateEvalMethod(e.target.value)
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
      <div className={styles.fieldLine}>
        <md-filled-select label={'Assessor LLM'} size={'large'} value={assessorLLM} onInput={(e: any) => {
          updateAssessorLLM(e.target.value)
        }}>
          {
            configSnap.args[4].map((t, i) => {
              return <md-select-option key={i} value={t}>
                <div slot="headline">{t}</div>
              </md-select-option>
            })
          }
        </md-filled-select>
        <md-filled-select label={'Repeat Times'} size={'large'} value={repeatTimes} onInput={(e: any) => {
          updateRepeatTimes(e.target.value)
        }}>
          {
            configSnap.args[5].map((t, i) => {
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
