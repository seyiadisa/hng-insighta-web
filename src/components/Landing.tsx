import { GithubIcon } from './GithubIcon'
import { featureCards, sampleSignals } from '../insightData'
import { useNavigate } from 'react-router'

export function LandingPage() {
	const navigate = useNavigate()

	function onContinue() {
		navigate('/user')
	}


	return (
		<main className="landing-page">
			<nav className="topbar" aria-label="Main navigation">
				<a className="brand" href="#top" aria-label="Insighta Labs home">
					<span className="brand-mark">IL</span>
					<span>Insighta Labs</span>
				</a>
			</nav>

			<section className="hero-shell" id="top">
				<div className="hero-copy">
					<p className="eyebrow">Name intelligence, one lookup away</p>
					<h1>Turn a name into useful demographic clues.</h1>
					<p className="lede">
						Insighta Labs pulls age, nationality, and gender predictions into a
						clean profile so your backend can turn public name data into
						something people can actually understand.
					</p>
					<button className="github-button" type="button" onClick={onContinue}>
						<GithubIcon />
						Continue with GitHub
					</button>

					<div className="feature-strip" aria-label="Insighta data providers">
						{featureCards.map((feature) => (
							<article key={feature.source}>
								<span>{feature.source}</span>
								<strong>{feature.title}</strong>
								<p>{feature.copy}</p>
							</article>
						))}
					</div>
				</div>

				<aside className="insight-panel" aria-label="Insight preview">
					<div className="scan-line" />
					<div className="panel-header">
						<span>Sample lookup</span>
						<strong>89%</strong>
					</div>
					<div className="profile-chip">
						<span className="avatar">MA</span>
						<div>
							<strong>Maya Adebayo</strong>
							<span>name-based demographic profile</span>
						</div>
					</div>
					<div className="signal-grid">
						{sampleSignals.map((signal) => (
							<span key={signal.label}>
								<strong>{signal.label}</strong>
								{signal.value}
							</span>
						))}
					</div>
				</aside>
			</section>
		</main>
	)
}
