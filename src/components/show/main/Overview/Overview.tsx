"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./Overview.module.scss";
import {subscribe, useSnapshot} from "valtio";
import Api from "@/app/api/api";
import AiMarkdown from "@/components/AiMarkdown/AiMarkdown";
import DataService from "@/app/service/data-service";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";

export default function Overview () {
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

  const apiData = useSnapshot(Api.data)


  const UNKNOWN = 'unknown'
  let createTime = UNKNOWN
  let lastTime = UNKNOWN
  
  return (
    <div className={styles.Overview}>
    </div>
  )
}
