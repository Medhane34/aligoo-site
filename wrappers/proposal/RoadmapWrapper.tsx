'use client'

import React from 'react'
import RoadmapSection from '@/components/proposal/RoadmapSection'
import { ProposalData, RoadmapSection as RoadmapType } from '@/types/ProposalType'

interface Props {
    proposal: ProposalData
}

const RoadmapWrapper: React.FC<Props> = ({ proposal }) => {
    // Strategy: Determine appropriate roadmap data source
    // 1. If override roadmap exists and has content, check useTemplate flag
    // 2. If useTemplate is false, use proposal.roadmap
    // 3. Otherwise, fall back to proposal.template.roadmap

    const rootRoadmap = proposal.roadmap
    const templateRoadmap = proposal.template?.roadmap

    // If globally disabled in overrides, strictly return null
    if (rootRoadmap?.enabled === false) {
        return null
    }

    // Determine effective data
    let effectiveData: RoadmapType | undefined

    if (rootRoadmap && rootRoadmap.useTemplate === false) {
        // USE OVERRIDE DATA
        effectiveData = rootRoadmap
    } else {
        // USE TEMPLATE DATA (Default)
        effectiveData = templateRoadmap
    }

    // Final check: if no effective data or phases, or effective data is explicitly disabled
    if (!effectiveData || effectiveData.enabled === false) {
        return null
    }

    if (!effectiveData.phases || effectiveData.phases.length === 0) {
        return null
    }

    return <RoadmapSection data={effectiveData} />
}

export default RoadmapWrapper
