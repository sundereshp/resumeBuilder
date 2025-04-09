import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const sectionContent = {
  'personalDetails': <p>Fill in your name, contact info, and address.</p>,
  'websites': <p>Add links to your GitHub, LinkedIn, or personal site.</p>,
  'certifications': <p>List certifications you've earned.</p>,
  'language': <p>Mention languages you speak or write.</p>,
  'accomplishment': <p>Highlight your notable achievements.</p>,
  'additionalInfo': <p>Any extra info that adds value.</p>,
  'affiliation': <p>Clubs, memberships, or professional affiliations.</p>
}

const readableNameMap = {
  personalDetails: 'Personal details',
  websites: 'Website,Portfolios,Profiles',
  certifications: 'Certifications',
  language: 'Language',
  accomplishment: 'Accomplishment',
  additionalInfo: 'Additional Information',
  affiliation: 'Affiliation'
}

const StepViewer = () => {
  const navigate = useNavigate()
  const { section } = useParams()
  const location = useLocation()
  const selectedSections = useMemo(() => {
    return location.state?.selectedSections || []
  }, [location.state])

  useEffect(() => {
    if (!selectedSections.length || !sectionContent[section]) {
      navigate('/dashboard/finalize/congrats')
    }
  }, [selectedSections, section, navigate])

  const currentIndex = selectedSections.findIndex(
    s => s === readableNameMap[section]
  )

  const handleNext = () => {
    if (currentIndex + 1 < selectedSections.length) {
      const nextReadable = selectedSections[currentIndex + 1]
      const nextKey = Object.keys(readableNameMap).find(
        key => readableNameMap[key] === nextReadable
      )
      navigate(`/dashboard/finalize/${nextKey}`, { state: { selectedSections } })
    } else {
      navigate('/dashboard/finalize/congrats')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Step {currentIndex + 1} of {selectedSections.length}</h2>
      <h3>{readableNameMap[section]}</h3>
      <div style={{ marginTop: '1rem' }}>
        {sectionContent[section]}
      </div>
      <button onClick={handleNext} style={{ marginTop: '2rem' }}>
        {currentIndex + 1 === selectedSections.length ? 'Finish' : 'Next'}
      </button>
    </div>
  )
}

export default StepViewer
