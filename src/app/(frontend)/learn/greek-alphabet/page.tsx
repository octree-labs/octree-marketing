import type { Metadata } from 'next/types'

import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Greek Alphabet', 'greek-alphabet')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'greek-alphabet',
  title: 'The Greek Alphabet: All 24 Letters in Order (with LaTeX Commands)',
  seoTitle: 'Greek Alphabet: All 24 Letters in Order + LaTeX',
  description: 'The complete Greek alphabet in order: all 24 uppercase and lowercase letters with names, pronunciation, Unicode code points, HTML entities, what each letter means in math and science, how to type them, and their LaTeX commands.',
  keywords: 'greek alphabet, greek alphabet in order, greek letters, greek alphabet symbols, greek alphabet lowercase, greek alphabet uppercase, greek letters in order, greek alphabet latex, how many letters in the greek alphabet, greek letters math, greek alphabet pronunciation, greek letters unicode, alpha beta gamma delta, last letter of greek alphabet',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

const faq: FaqItem[] = [
  {
    question: 'How many letters are in the Greek alphabet?',
    answer:
      'Twenty-four, each with an uppercase and a lowercase form. Counting the final sigma ς as a separate glyph gives 25 lowercase shapes, but it is still the same letter.',
  },
  {
    question: 'What is the last letter of the Greek alphabet?',
    answer:
      'Omega (Ω ω). That is why "the alpha and the omega" means the beginning and the end, and why Ω is often chosen for "the whole" of something, such as the sample space in probability.',
  },
  {
    question: 'Is there a letter J in the Greek alphabet?',
    answer:
      'No. Greek has no J, and no direct equivalents of the Latin letters C, F, Q, V, or W either (the archaic digamma once covered the w sound). Names with those letters are transliterated using the closest sounds, so "John" becomes Ιωάννης.',
  },
  {
    question: 'Why do math and physics use Greek letters?',
    answer:
      'Partly tradition — Euclid, Archimedes, and Ptolemy wrote in Greek, and Renaissance mathematicians kept their notation — and partly necessity. Once the 26 Latin letters are used up for variables, Greek supplies another 24 symbols that are visually distinct from Latin ones, so θ can be an angle in the same equation where t is time.',
  },
  {
    question: 'What is the difference between ε and ϵ, or φ and ϕ?',
    answer:
      "Nothing semantically; they are glyph variants of the same letter. LaTeX exposes both so authors can match a journal's house style. Most modern texts prefer \\varepsilon (ε) and \\varphi (φ).",
  },
]

export default async function GreekAlphabetPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LearnSchema
        slug={page.slug}
        title={page.title}
        description={page.description}
        dateModified={LAST_UPDATED}
        faq={faq}
      />
      <div className="container">
        <div className="mb-8 max-w-4xl mx-auto">
          <Link
            href="/learn"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to Learn
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>The Greek Alphabet: All 24 Letters in Order (with LaTeX Commands)</h1>
          <p className="lead">
            The Greek alphabet has 24 letters, from alpha (&Alpha; &alpha;) to omega
            (&Omega; &omega;). It has been in continuous use since around 800 BC, and today
            its letters are everywhere in mathematics, physics, statistics, and engineering.
            This page lists every letter in order with its uppercase and lowercase form,
            name, pronunciation, Unicode code point, and the LaTeX command that produces it.
          </p>

          {/* ───────────────────────────── Full Table ───────────────────────────── */}
          <h2>The 24 Greek Letters in Order</h2>
          <p>
            Uppercase and lowercase forms are shown side by side. In LaTeX, every lowercase
            letter has its own command. Uppercase letters that look identical to a Latin
            letter (Alpha, Beta, Epsilon, Zeta, Eta, Iota, Kappa, Mu, Nu, Omicron, Rho, Tau,
            Chi) have no command at all: you simply type <code>A</code>, <code>B</code>,{' '}
            <code>E</code>, and so on in math mode. Lowercase omicron is likewise typed
            as a plain <code>o</code>.
          </p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Upper</th>
                <th>Lower</th>
                <th>Name</th>
                <th>Transliteration / Pronunciation</th>
                <th>LaTeX (lower / upper)</th>
                <th>Variant</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>&Alpha;</td><td>&alpha;</td><td>Alpha</td><td>a — &quot;AL-fuh&quot;</td><td><code>\alpha</code> / <code>A</code></td><td>—</td></tr>
              <tr><td>2</td><td>&Beta;</td><td>&beta;</td><td>Beta</td><td>b — &quot;BAY-tuh&quot; (US), &quot;BEE-tuh&quot; (UK)</td><td><code>\beta</code> / <code>B</code></td><td>—</td></tr>
              <tr><td>3</td><td>&Gamma;</td><td>&gamma;</td><td>Gamma</td><td>g — &quot;GAM-uh&quot;</td><td><code>\gamma</code> / <code>\Gamma</code></td><td>—</td></tr>
              <tr><td>4</td><td>&Delta;</td><td>&delta;</td><td>Delta</td><td>d — &quot;DEL-tuh&quot;</td><td><code>\delta</code> / <code>\Delta</code></td><td>—</td></tr>
              <tr><td>5</td><td>&Epsilon;</td><td>&epsilon;</td><td>Epsilon</td><td>e (short) — &quot;EP-sih-lon&quot;</td><td><code>\epsilon</code> / <code>E</code></td><td><code>\varepsilon</code> &#949;</td></tr>
              <tr><td>6</td><td>&Zeta;</td><td>&zeta;</td><td>Zeta</td><td>z — &quot;ZAY-tuh&quot;</td><td><code>\zeta</code> / <code>Z</code></td><td>—</td></tr>
              <tr><td>7</td><td>&Eta;</td><td>&eta;</td><td>Eta</td><td>&#275; (long e) — &quot;AY-tuh&quot;</td><td><code>\eta</code> / <code>H</code></td><td>—</td></tr>
              <tr><td>8</td><td>&Theta;</td><td>&theta;</td><td>Theta</td><td>th — &quot;THAY-tuh&quot;</td><td><code>\theta</code> / <code>\Theta</code></td><td><code>\vartheta</code> &#977;</td></tr>
              <tr><td>9</td><td>&Iota;</td><td>&iota;</td><td>Iota</td><td>i — &quot;eye-OH-tuh&quot;</td><td><code>\iota</code> / <code>I</code></td><td>—</td></tr>
              <tr><td>10</td><td>&Kappa;</td><td>&kappa;</td><td>Kappa</td><td>k — &quot;KAP-uh&quot;</td><td><code>\kappa</code> / <code>K</code></td><td>—</td></tr>
              <tr><td>11</td><td>&Lambda;</td><td>&lambda;</td><td>Lambda</td><td>l — &quot;LAM-duh&quot;</td><td><code>\lambda</code> / <code>\Lambda</code></td><td>—</td></tr>
              <tr><td>12</td><td>&Mu;</td><td>&mu;</td><td>Mu</td><td>m — &quot;MYOO&quot;</td><td><code>\mu</code> / <code>M</code></td><td>—</td></tr>
              <tr><td>13</td><td>&Nu;</td><td>&nu;</td><td>Nu</td><td>n — &quot;NYOO&quot;</td><td><code>\nu</code> / <code>N</code></td><td>—</td></tr>
              <tr><td>14</td><td>&Xi;</td><td>&xi;</td><td>Xi</td><td>x (ks) — &quot;KSEE&quot; or &quot;ZYE&quot;</td><td><code>\xi</code> / <code>\Xi</code></td><td>—</td></tr>
              <tr><td>15</td><td>&Omicron;</td><td>&omicron;</td><td>Omicron</td><td>o (short) — &quot;OM-ih-kron&quot;</td><td><code>o</code> / <code>O</code></td><td>—</td></tr>
              <tr><td>16</td><td>&Pi;</td><td>&pi;</td><td>Pi</td><td>p — &quot;PIE&quot; (English), &quot;PEE&quot; (Greek)</td><td><code>\pi</code> / <code>\Pi</code></td><td><code>\varpi</code> &#982;</td></tr>
              <tr><td>17</td><td>&Rho;</td><td>&rho;</td><td>Rho</td><td>r (rh) — &quot;ROH&quot;</td><td><code>\rho</code> / <code>P</code></td><td><code>\varrho</code> &#1009;</td></tr>
              <tr><td>18</td><td>&Sigma;</td><td>&sigma; / &sigmaf;</td><td>Sigma</td><td>s — &quot;SIG-muh&quot;</td><td><code>\sigma</code> / <code>\Sigma</code></td><td><code>\varsigma</code> &#962; (word-final)</td></tr>
              <tr><td>19</td><td>&Tau;</td><td>&tau;</td><td>Tau</td><td>t — &quot;TAW&quot; or &quot;TOW&quot;</td><td><code>\tau</code> / <code>T</code></td><td>—</td></tr>
              <tr><td>20</td><td>&Upsilon;</td><td>&upsilon;</td><td>Upsilon</td><td>u / y — &quot;OOP-sih-lon&quot;</td><td><code>\upsilon</code> / <code>\Upsilon</code></td><td>—</td></tr>
              <tr><td>21</td><td>&Phi;</td><td>&phi;</td><td>Phi</td><td>ph (f) — &quot;FYE&quot; or &quot;FEE&quot;</td><td><code>\phi</code> / <code>\Phi</code></td><td><code>\varphi</code> &#966;</td></tr>
              <tr><td>22</td><td>&Chi;</td><td>&chi;</td><td>Chi</td><td>ch (kh) — &quot;KYE&quot;</td><td><code>\chi</code> / <code>X</code></td><td>—</td></tr>
              <tr><td>23</td><td>&Psi;</td><td>&psi;</td><td>Psi</td><td>ps — &quot;SIGH&quot; or &quot;PSEE&quot;</td><td><code>\psi</code> / <code>\Psi</code></td><td>—</td></tr>
              <tr><td>24</td><td>&Omega;</td><td>&omega;</td><td>Omega</td><td>&#333; (long o) — &quot;oh-MAY-guh&quot;</td><td><code>\omega</code> / <code>\Omega</code></td><td>—</td></tr>
            </tbody>
          </table>
          <p>
            Lowercase sigma has two forms: <strong>&sigma;</strong> inside a word and{' '}
            <strong>&sigmaf;</strong> (final sigma) at the end of a word. The variant forms in
            the last column are alternative glyph shapes, not different letters. In LaTeX,{' '}
            <code>\epsilon</code> gives the lunate &#1013; and <code>\varepsilon</code> gives
            the curly &#949; most people expect; <code>\phi</code> gives the closed &#981; while{' '}
            <code>\varphi</code> gives the open &#966;.
          </p>

          {/* ───────────────────────────── Order and Mnemonic ───────────────────────────── */}
          <h2>How the Alphabet Is Ordered (and a Mnemonic)</h2>
          <p>
            The order is inherited from the Phoenician script the Greeks adapted: Phoenician{' '}
            <em>aleph, bet, gimel, dalet</em> became <em>alpha, beta, gamma, delta</em>. The
            word &quot;alphabet&quot; itself is just the first two letters joined together. The
            Greeks dropped Phoenician consonants they did not need and reused them as vowels,
            which is why Greek was the first alphabet to write vowels explicitly. Phi, chi and
            psi were Greek inventions; upsilon was a second derivation of Phoenician waw and
            omega a modified omicron, which is why those five sit after tau.
          </p>
          <p>
            The easiest way to memorise the order is to chant it in six groups of four:
          </p>
          <pre><code>{`alpha   beta    gamma   delta
epsilon zeta    eta     theta
iota    kappa   lambda  mu
nu      xi      omicron pi
rho     sigma   tau     upsilon
phi     chi     psi     omega`}</code></pre>
          <p>
            Because every letter also had a numeric value (&alpha; = 1, &beta; = 2 … &iota; = 10,
            &kappa; = 20 … &rho; = 100, &sigma; = 200 …), the order was fixed early and has not
            changed since classical times.
          </p>

          {/* ───────────────────────────── Archaic Letters ───────────────────────────── */}
          <h2>Archaic and Obsolete Letters</h2>
          <p>
            Early Greek had a few extra letters that dropped out of everyday writing but
            survived in the numeral system:
          </p>
          <ul>
            <li><strong>Digamma (&#988; &#989;)</strong> — pronounced /w/, sat between epsilon and zeta, and stood for the number 6.</li>
            <li><strong>Stigma (&#986; &#987;)</strong> — a ligature of sigma and tau that later replaced digamma as the numeral 6.</li>
            <li><strong>Koppa (&#984; &#985;, later &#990; &#991;)</strong> — a /k/ sound before back vowels, kept as the numeral 90. The Latin letter Q descends from it.</li>
            <li><strong>Sampi (&#992; &#993;)</strong> — of uncertain sound value, used only as the numeral 900.</li>
          </ul>
          <p>
            In LaTeX the <code>amssymb</code> package provides <code>\digamma</code> (&#989;),
            which some analysis texts use as a symbol; the others are available via Unicode
            with XeLaTeX or LuaLaTeX.
          </p>

          {/* ───────────────────────────── Uses in Math and Science ───────────────────────────── */}
          <h2>What Each Greek Letter Is Used For</h2>
          <p>
            Scientists reached for Greek letters once the Latin alphabet ran out. Many of these
            conventions are now fixed: nobody writes the ratio of a circle&apos;s circumference
            to its diameter as anything other than &pi;.
          </p>
          <ul>
            <li><strong>&alpha; alpha</strong> — angles, significance level in statistics, alpha particles, the fine-structure constant, angular acceleration. See our <Link href="/blog/alpha-symbol-uses-meaning-complete-guide">alpha symbol guide</Link>.</li>
            <li><strong>&beta; beta</strong> — regression coefficients, beta particles and beta decay, the beta function, <em>v/c</em> in relativity.</li>
            <li><strong>&gamma; / &Gamma; gamma</strong> — the Lorentz factor, photons and gamma rays, the Euler–Mascheroni constant, heat-capacity ratio; &Gamma; is the gamma function and the Christoffel symbols.</li>
            <li><strong>&delta; / &Delta; delta</strong> — a small change or variation, the Dirac and Kronecker deltas, NMR chemical shift; &Delta; is a finite change, the Laplacian, and the discriminant. See our <Link href="/blog/delta-symbols-math-science-complete-guide">delta symbol guide</Link>.</li>
            <li><strong>&epsilon; epsilon</strong> — an arbitrarily small positive number (the &epsilon;–&delta; definition of a limit), permittivity, strain, the Levi-Civita symbol.</li>
            <li><strong>&zeta; zeta</strong> — the Riemann zeta function, damping ratio in control theory.</li>
            <li><strong>&eta; eta</strong> — efficiency, dynamic viscosity, the Minkowski metric, the eta meson.</li>
            <li><strong>&theta; / &Theta; theta</strong> — angles, an unknown parameter in statistics; &Theta; is big-Theta complexity and the Heaviside step function.</li>
            <li><strong>&iota; iota</strong> — inclusion maps in algebra; rare elsewhere because it looks like <em>i</em>.</li>
            <li><strong>&kappa; kappa</strong> — curvature, condition number of a matrix, Cohen&apos;s kappa, the von Kármán constant.</li>
            <li><strong>&lambda; / &Lambda; lambda</strong> — wavelength, eigenvalues, decay constant, Poisson rate, Lagrange multipliers, lambda calculus; &Lambda; is the cosmological constant and a diagonal eigenvalue matrix.</li>
            <li><strong>&mu; mu</strong> — the mean, the micro- prefix (10<sup>&minus;6</sup>), coefficient of friction, permeability, reduced mass, the muon.</li>
            <li><strong>&nu; nu</strong> — frequency, degrees of freedom, kinematic viscosity, Poisson&apos;s ratio, the neutrino.</li>
            <li><strong>&xi; / &Xi; xi</strong> — a random variable, correlation length; &Xi; is the grand canonical partition function and the cascade baryons.</li>
            <li><strong>&omicron; omicron</strong> — almost never used as a symbol because it is indistinguishable from <em>o</em>.</li>
            <li><strong>&pi; / &Pi; pi</strong> — 3.14159…, the prime-counting function &pi;(<em>x</em>), the pion; &Pi; is the product operator.</li>
            <li><strong>&rho; rho</strong> — density, resistivity, charge density, Pearson&apos;s correlation coefficient, the radial coordinate.</li>
            <li><strong>&sigma; / &Sigma; sigma</strong> — standard deviation, stress, electrical conductivity, the Pauli matrices, cross section; &Sigma; is summation and the covariance matrix. See our <Link href="/blog/sigma-symbol-meaning-uses-how-to-type">sigma symbol guide</Link>.</li>
            <li><strong>&tau; tau</strong> — torque, time constant, proper time, shear stress, the tau lepton, and the circle constant 2&pi;.</li>
            <li><strong>&upsilon; / &Upsilon; upsilon</strong> — rarely used (it looks like <em>v</em>); &Upsilon; is the upsilon meson.</li>
            <li><strong>&phi; / &Phi; phi</strong> — the golden ratio, phase angle, azimuthal angle, Euler&apos;s totient function; &Phi; is magnetic flux, electric potential, and the standard normal CDF.</li>
            <li><strong>&chi; chi</strong> — the chi-squared distribution, magnetic and electric susceptibility, the Euler characteristic, indicator functions.</li>
            <li><strong>&psi; / &Psi; psi</strong> — the quantum wave function, stream function in fluid dynamics, the digamma function.</li>
            <li><strong>&omega; / &Omega; omega</strong> — angular frequency and velocity, the first infinite ordinal; &Omega; is the ohm, the sample space in probability, solid angle, and big-Omega complexity. See our <Link href="/blog/omega-symbol-meaning-uses-math-science">omega symbol guide</Link>.</li>
          </ul>

          {/* ───────────────────────────── Typing Greek Letters ───────────────────────────── */}
          <h2>How to Type Greek Letters</h2>
          <h3>Unicode Code Points and HTML Entities</h3>
          <p>
            Uppercase letters occupy <strong>U+0391 (&Alpha;) through U+03A9 (&Omega;)</strong>{' '}
            and lowercase letters occupy <strong>U+03B1 (&alpha;) through U+03C9 (&omega;)</strong>,
            in alphabetical order. U+03A2 is left unassigned (there is no uppercase final
            sigma), and U+03C2 is the lowercase final sigma &sigmaf;. HTML and XML use the
            letter&apos;s name as an entity, capitalised for uppercase:
          </p>
          <table>
            <thead>
              <tr>
                <th>Letter</th>
                <th>Unicode</th>
                <th>HTML entity</th>
                <th>Letter</th>
                <th>Unicode</th>
                <th>HTML entity</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>&Alpha;</td><td>U+0391</td><td><code>&amp;Alpha;</code></td><td>&alpha;</td><td>U+03B1</td><td><code>&amp;alpha;</code></td></tr>
              <tr><td>&Beta;</td><td>U+0392</td><td><code>&amp;Beta;</code></td><td>&beta;</td><td>U+03B2</td><td><code>&amp;beta;</code></td></tr>
              <tr><td>&Gamma;</td><td>U+0393</td><td><code>&amp;Gamma;</code></td><td>&gamma;</td><td>U+03B3</td><td><code>&amp;gamma;</code></td></tr>
              <tr><td>&Delta;</td><td>U+0394</td><td><code>&amp;Delta;</code></td><td>&delta;</td><td>U+03B4</td><td><code>&amp;delta;</code></td></tr>
              <tr><td>&Theta;</td><td>U+0398</td><td><code>&amp;Theta;</code></td><td>&theta;</td><td>U+03B8</td><td><code>&amp;theta;</code></td></tr>
              <tr><td>&Lambda;</td><td>U+039B</td><td><code>&amp;Lambda;</code></td><td>&lambda;</td><td>U+03BB</td><td><code>&amp;lambda;</code></td></tr>
              <tr><td>&Pi;</td><td>U+03A0</td><td><code>&amp;Pi;</code></td><td>&pi;</td><td>U+03C0</td><td><code>&amp;pi;</code></td></tr>
              <tr><td>&Sigma;</td><td>U+03A3</td><td><code>&amp;Sigma;</code></td><td>&sigma; / &sigmaf;</td><td>U+03C3 / U+03C2</td><td><code>&amp;sigma;</code> / <code>&amp;sigmaf;</code></td></tr>
              <tr><td>&Phi;</td><td>U+03A6</td><td><code>&amp;Phi;</code></td><td>&phi;</td><td>U+03C6</td><td><code>&amp;phi;</code></td></tr>
              <tr><td>&Omega;</td><td>U+03A9</td><td><code>&amp;Omega;</code></td><td>&omega;</td><td>U+03C9</td><td><code>&amp;omega;</code></td></tr>
            </tbody>
          </table>
          <p>
            Every other letter follows the same pattern: the <em>n</em>th uppercase letter is
            U+0390 + <em>n</em> and the <em>n</em>th lowercase letter is U+03B0 + <em>n</em>
            (counting the extra slot after rho: unassigned in uppercase, final sigma in lowercase). You can also write a numeric entity such
            as <code>&amp;#945;</code> for &alpha;.
          </p>

          <h3>Mac</h3>
          <ul>
            <li>Press <strong>Ctrl + Cmd + Space</strong> to open the Character Viewer, search &quot;greek&quot;, and double-click a letter.</li>
            <li>For regular use add the Greek keyboard: <em>System Settings → Keyboard → Input Sources → + → Greek</em>, then switch layouts with <strong>Ctrl + Space</strong>. Keys map phonetically (A = &alpha;, B = &beta;, G = &gamma;, D = &delta;, F = &phi;, U = &theta;).</li>
            <li>A few letters are available on the US layout with the Option key: <strong>Option + P</strong> gives &pi;, <strong>Option + M</strong> gives &micro;, <strong>Option + Z</strong> gives &Omega;.</li>
          </ul>
          <h3>Windows</h3>
          <ul>
            <li>On Windows 11, press <strong>Win + .</strong> (period) to open the emoji panel, choose the <em>Symbols</em> tab, and scroll to the Greek section.</li>
            <li>In Microsoft Word, type the hex code and press <strong>Alt + X</strong>: <code>03B1</code> then Alt + X becomes &alpha;.</li>
            <li>Add the Greek keyboard under <em>Settings → Time &amp; Language → Language &amp; region → Add a language → Greek</em> and switch with <strong>Win + Space</strong>.</li>
            <li>Legacy Alt codes cover only a handful of letters (for example <strong>Alt + 224</strong> = &alpha;, <strong>Alt + 227</strong> = &pi;, <strong>Alt + 228</strong> = &Sigma;, <strong>Alt + 234</strong> = &Omega;) and only on US-English systems using code page 437; elsewhere they produce accented Latin letters, so prefer Alt + X or the Greek layout.</li>
          </ul>
          <h3>iPhone and Android</h3>
          <ul>
            <li><strong>iPhone / iPad:</strong> <em>Settings → General → Keyboard → Keyboards → Add New Keyboard → Greek</em>. Tap or hold the globe key to switch while typing.</li>
            <li><strong>Android (Gboard):</strong> <em>Settings → System → Languages &amp; input → On-screen keyboard → Gboard → Languages → Add keyboard → Greek</em>. Swipe the space bar or tap the globe to switch.</li>
          </ul>

          {/* ───────────────────────────── Greek Letters in LaTeX ───────────────────────────── */}
          <h2>Greek Letters in LaTeX</h2>
          <p>
            Greek letter commands only work in <strong>math mode</strong>: wrap them in{' '}
            <code>$...$</code> for inline math or <code>\[...\]</code> for a displayed
            equation. Using <code>\alpha</code> in ordinary text produces the error
            &quot;Missing $ inserted&quot;.
          </p>
          <pre><code>{`% Lowercase and uppercase in math mode
$\\alpha + \\beta = \\gamma$
$\\Delta x = x_2 - x_1$
$\\Sigma$ is the covariance matrix, $A$ is uppercase alpha

% Variant forms
$\\epsilon$ vs $\\varepsilon$,  $\\phi$ vs $\\varphi$,  $\\theta$ vs $\\vartheta$

% Uppercase letters that match Latin letters have no command
$A, B, E, Z, H, I, K, M, N, O, P, T, X$`}</code></pre>

          <h3>Upright Greek with upgreek</h3>
          <p>
            Lowercase Greek letters are italic by default, which is correct for variables.
            Units and constants (&micro;m, the &pi; in &quot;&pi; meson&quot;) should be upright.
            The <code>upgreek</code> package adds <code>\up</code> versions of every letter:
          </p>
          <pre><code>{`\\usepackage{upgreek}

$\\upalpha, \\upbeta, \\upgamma, \\uppi, \\upmu$   % upright lowercase
$\\Upgamma, \\Updelta, \\Upomega$              % upright uppercase`}</code></pre>

          <h3>Greek in Text Mode</h3>
          <p>
            To write actual Greek words rather than symbols, load the Greek language with{' '}
            <code>babel</code>. With pdfLaTeX, the <code>\textgreek</code> command accepts a
            Latin transliteration (<code>a</code> → &alpha;, <code>b</code> → &beta;, <code>g</code> → &gamma;):
          </p>
          <pre><code>{`\\usepackage[greek,english]{babel}

The Greek word \\textgreek{l'ogos} means \`\`word''.`}</code></pre>
          <p>
            Alternatively, the <code>textgreek</code> package gives per-letter text commands
            (load it in the preamble):
          </p>
          <pre><code>{`\\usepackage{textgreek}
...
A \\textbeta{}-strand and the \\textmu{}m scale.`}</code></pre>
          <p>
            With XeLaTeX or LuaLaTeX and a font that contains Greek glyphs, you can type
            &lambda;&omicron;&gamma;&omicron;&sigmaf; directly in the source and skip the
            transliteration entirely. Add <code>\usepackage&#123;unicode-math&#125;</code> and
            the same works inside math mode too.
          </p>

          <h3>Bold Greek Letters</h3>
          <p>
            <code>\mathbf</code> does nothing to lowercase Greek because those glyphs come from
            the math-italic font. Use <code>\boldsymbol</code> (from <code>amsmath</code>) or{' '}
            <code>\bm</code> (from the <code>bm</code> package) instead; both work for
            uppercase too and are the standard way to write Greek vectors:
          </p>
          <pre><code>{`\\usepackage{amsmath}   % provides \\boldsymbol
\\usepackage{bm}        % provides \\bm (slightly more robust)

$\\boldsymbol{\\alpha}$,  $\\bm{\\theta}$,  $\\bm{\\Sigma}$

% Common pattern: a vector of parameters
$\\hat{\\bm{\\beta}} = (\\mathbf{X}^\\top \\mathbf{X})^{-1} \\mathbf{X}^\\top \\mathbf{y}$`}</code></pre>

          <h3>Italic Uppercase Greek</h3>
          <p>
            LaTeX sets uppercase Greek upright by default, but the ISO 80000-2 convention
            (followed by many physics journals) wants variables italic. You have three
            options: wrap the letter in <code>\mathit</code>, use the <code>\varGamma</code>…
            <code>\varOmega</code> commands that <code>amsmath</code> provides, or load a
            package that changes the default:
          </p>
          <pre><code>{`% One-off
$\\mathit{\\Gamma}$  or  $\\varGamma, \\varDelta, \\varOmega$   % amsmath

% Change the default document-wide
\\usepackage{fixmath}   % uppercase Greek italic, as in ISO style
% or
\\usepackage{isomath}   % also adds \\mathsfbfit etc. for tensors`}</code></pre>
          <p>
            For a full list of math operators, arrows, and relation symbols to go with these
            letters, see our{' '}
            <Link href="/learn/greek-letters-math-symbols">Greek letters and math symbols reference</Link>.
          </p>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How many letters are in the Greek alphabet?</h3>
          <p>
            Twenty-four, each with an uppercase and a lowercase form. Counting the final sigma
            &sigmaf; as a separate glyph gives 25 lowercase shapes, but it is still the same
            letter.
          </p>
          <h3>What is the last letter of the Greek alphabet?</h3>
          <p>
            Omega (&Omega; &omega;). That is why &quot;the alpha and the omega&quot; means the
            beginning and the end, and why &Omega; is often chosen for &quot;the whole&quot; of
            something, such as the sample space in probability.
          </p>
          <h3>Is there a letter J in the Greek alphabet?</h3>
          <p>
            No. Greek has no J, and no direct equivalents of the Latin letters C, F, Q, V, or
            W either (the archaic digamma once covered the <em>w</em> sound). Names with those
            letters are transliterated using the closest sounds, so &quot;John&quot; becomes
            &Iota;&omega;&#940;&nu;&nu;&eta;&sigmaf;.
          </p>
          <h3>Why do math and physics use Greek letters?</h3>
          <p>
            Partly tradition — Euclid, Archimedes, and Ptolemy wrote in Greek, and
            Renaissance mathematicians kept their notation — and partly necessity. Once the
            26 Latin letters are used up for variables, Greek supplies another 24 symbols that
            are visually distinct from Latin ones, so &theta; can be an angle in the same
            equation where <em>t</em> is time.
          </p>
          <h3>What is the difference between &epsilon; and &#1013;, or &phi; and &#981;?</h3>
          <p>
            Nothing semantically; they are glyph variants of the same letter. LaTeX exposes both
            so authors can match a journal&apos;s house style. Most modern texts prefer{' '}
            <code>\varepsilon</code> (&#949;) and <code>\varphi</code> (&#966;).
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>Now that you know the alphabet, put the letters to work:</p>
          <ul>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols in LaTeX</Link> – Every operator, relation, arrow, and symbol with copy-paste commands</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Fractions, roots, aligned equations, and the amsmath package</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> – Index your Greek variables correctly</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums, and Limits</Link> – Where &Sigma; and &Pi; become operators</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Search every Greek letter and copy its command</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Check how your Greek letters render with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> – Convert handwritten equations, Greek letters included, to LaTeX</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="Greek symbol" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree – the AI-powered LaTeX editor that makes writing faster and easier.
              Type any Greek letter with intelligent autocomplete and see it rendered instantly.
            </p>
            <Link
              href="https://app.useoctree.com"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Try Octree Free →
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return learnMetadata(page)
}
