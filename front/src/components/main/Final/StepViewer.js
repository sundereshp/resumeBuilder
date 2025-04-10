
import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PersonalDetails from './section/personalDetails'
import Certifications from './section/certification'
import Language from './section/language'
import Hobbies from './section/hobbies'

const sectionComponents = {
  'personalDetails': PersonalDetails,
  'certifications': Certifications,
  'language': Language,
  'hobbies': Hobbies,
}

function StepViewer() {
  const location = useLocation()
  const navigate = useNavigate()
  const { section } = useParams()

  const selectedSections = useMemo(() => {
    return location.state?.selectedSections || []
  }, [location.state])

  const currentIndex = selectedSections.indexOf(section)
  const nextSection = selectedSections[currentIndex + 1]

  const SectionComponent = sectionComponents[section]

  useEffect(() => {
    if (!selectedSections.length || !SectionComponent) {
      navigate('/dashboard/finalize/congrats')
    }
  }, [selectedSections, section, navigate, SectionComponent])

  const handleNext = () => {
    if (nextSection) {
      navigate(`/dashboard/finalize/${nextSection}`, {
        state: { selectedSections }
      })
    } else {
      navigate('/dashboard/finalize/congrats')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      {SectionComponent ? <SectionComponent /> : <p>Loading...</p>}

      <button onClick={handleNext} style={{ marginTop: '2rem' }}>
        {nextSection ? 'Next' : 'Finish'}
      </button>
    </div>
  )
}

export default StepViewer
