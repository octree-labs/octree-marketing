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

const breadcrumbs = getLearnBreadcrumbs('Molecular Orbital Diagrams in LaTeX', 'molecular-orbital-diagrams')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'molecular-orbital-diagrams',
  title: 'Molecular Orbital Diagrams in LaTeX: TikZ, chemfig and modiagram',
  seoTitle: 'Molecular Orbital Diagrams in LaTeX: modiagram',
  description:
    'How to read and draw molecular orbital diagrams: bonding and antibonding orbitals, electron filling and bond order, worked H2, O2, N2 and CO diagrams, then the LaTeX: the modiagram package, a pure TikZ version, chemfig Lewis structures, mhchem formulas and common errors.',
  keywords:
    'molecular orbital diagram, mo diagram, molecular orbital diagram latex, o2 molecular orbital diagram, n2 molecular orbital diagram, h2 molecular orbital diagram, co molecular orbital diagram, modiagram package, bond order, bonding antibonding orbitals, tikz mo diagram, chemfig lewis structure, mhchem, latex chemistry',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do you calculate bond order from a molecular orbital diagram?',
    answer:
      'Count the electrons in bonding orbitals, subtract the electrons in antibonding orbitals and divide by two: bond order = (bonding − antibonding) / 2. For O2 that is (8 − 4) / 2 = 2, a double bond; for N2 it is (8 − 2) / 2 = 3; for He2 it is (2 − 2) / 2 = 0, which is why He2 does not exist. A higher bond order means a shorter, stronger bond.',
  },
  {
    question: 'Why is O2 paramagnetic according to MO theory?',
    answer:
      'O2 has 12 valence electrons. After filling σ2s, σ*2s, σ2p and the two π2p orbitals, two electrons remain for the two degenerate π*2p orbitals. By Hund\'s rule they occupy one each with parallel spins, so O2 has two unpaired electrons and is attracted into a magnetic field. A Lewis structure, with all electrons paired, cannot explain this; the MO diagram does.',
  },
  {
    question: 'Why is the MO order different for N2 and O2?',
    answer:
      'For B2, C2 and N2 the 2s and 2p atomic orbitals are close enough in energy that the σ2s and σ2p molecular orbitals mix (s–p mixing). The mixing pushes σ2p up above the π2p pair, so the order is σ2s < σ*2s < π2p < σ2p. In O2 and F2 the 2s–2p gap is larger, the mixing is weak, and σ2p lies below π2p. The two orderings give the same bond order for O2 and N2 but change which orbital is the HOMO.',
  },
  {
    question: 'What LaTeX package draws MO diagrams?',
    answer:
      'modiagram is the dedicated package: \\usepackage{modiagram} gives you a modiagram environment with \\atom for the atomic orbitals, \\molecule for the molecular orbitals and \\EnergyAxis, and it draws the levels, electrons and correlation lines for 1s, 2s and 2p for you. It is built on TikZ, so for anything it does not cover (d orbitals, ligand field diagrams, more than two fragments) you draw the diagram directly in TikZ.',
  },
  {
    question: 'How do I write O2, N2 or O2^- with proper formatting in LaTeX?',
    answer:
      'Load mhchem with \\usepackage[version=4]{mhchem} and write \\ce{O2}, \\ce{N2}, \\ce{O2^-} and \\ce{CO}. \\ce sets the subscripts and charges upright and in the right position, works in text and in math mode, and also handles reaction arrows such as \\ce{2 H2 + O2 -> 2 H2O}. It can be used inside modiagram and TikZ labels too.',
  },
]

export default async function MolecularOrbitalDiagramsPage() {
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
          <h1>Molecular Orbital Diagrams in LaTeX: TikZ, chemfig and modiagram</h1>
          <p className="lead">
            A molecular orbital (MO) diagram shows how the atomic orbitals of two atoms combine
            into the orbitals of a molecule, and where the electrons go. It predicts bond
            order, bond strength and magnetism, including facts a Lewis structure gets wrong,
            such as O<sub>2</sub> being paramagnetic. The first half of this guide explains how
            to read and fill an MO diagram, with worked diagrams for H<sub>2</sub>,
            O<sub>2</sub>, N<sub>2</sub> and CO. The second half shows how to draw them in LaTeX
            with the <code>modiagram</code> package, in plain TikZ, and with chemfig and mhchem
            for the structures and formulas beside them.
          </p>

          {/* ── What ── */}
          <h2>How to Read a Molecular Orbital Diagram</h2>
          <p>
            Energy runs upward. The atomic orbitals (AOs) of the two atoms are drawn as short
            horizontal lines on the left and right; the molecular orbitals (MOs) they form sit
            in the middle, joined to their parent AOs by thin correlation lines. Each pair of
            AOs that overlaps gives two MOs:
          </p>
          <ul>
            <li>a <strong>bonding</strong> orbital (σ or π), lower in energy than the AOs, where the wavefunctions add and electron density builds up between the nuclei;</li>
            <li>an <strong>antibonding</strong> orbital (σ* or π*), higher in energy, with a node between the nuclei.</li>
          </ul>
          <p>
            σ orbitals come from head-on overlap (s with s, or p<sub>z</sub> with
            p<sub>z</sub> along the bond axis); π orbitals come from sideways overlap of
            p<sub>x</sub> and p<sub>y</sub>, so they come in degenerate pairs. The electrons are
            then filled in exactly as for atoms: lowest orbital first (Aufbau), at most two per
            orbital with opposite spins (Pauli), and one electron in each degenerate orbital
            before pairing (Hund). The result is read off with one formula:
          </p>
          <pre><code>{`bond order = (electrons in bonding MOs − electrons in antibonding MOs) / 2`}</code></pre>
          <p>
            Bond order 1 is a single bond, 2 a double bond, 3 a triple bond, 0 means the molecule
            does not form. Fractional values are allowed and show up in ions. If any MO holds
            unpaired electrons the species is paramagnetic; if all are paired it is diamagnetic.
          </p>

          {/* ── H2 ── */}
          <h2>H<sub>2</sub>: The Simplest Diagram</h2>
          <p>
            Each hydrogen brings one 1s electron. The two 1s AOs combine into σ<sub>1s</sub>{' '}
            (bonding) and σ*<sub>1s</sub> (antibonding). Both electrons go into σ<sub>1s</sub>{' '}
            with paired spins:
          </p>
          <pre><code>{`H2:   (σ1s)²           bond order = (2 − 0)/2 = 1,  diamagnetic
He2:  (σ1s)² (σ*1s)²   bond order = (2 − 2)/2 = 0,  no bond
He2+: (σ1s)² (σ*1s)¹   bond order = (2 − 1)/2 = ½,  observed as a weak ion`}</code></pre>
          <p>
            The same diagram explains why helium is monatomic: in He<sub>2</sub> the two extra
            electrons fill the antibonding orbital and cancel the bonding ones.
          </p>

          {/* ── Second period ── */}
          <h2>Second-Period Diatomics: O<sub>2</sub> and N<sub>2</sub></h2>
          <p>
            For Li<sub>2</sub> to Ne<sub>2</sub> the 1s electrons are core and are left out.
            The 2s AOs give σ<sub>2s</sub> and σ*<sub>2s</sub>; the three 2p AOs give
            σ<sub>2p</sub>, a degenerate π<sub>2p</sub> pair, a degenerate π*<sub>2p</sub> pair
            and σ*<sub>2p</sub>. There are two orderings of the 2p-derived levels, and this is
            the point most students lose marks on:
          </p>
          <ul>
            <li><strong>O<sub>2</sub>, F<sub>2</sub>, Ne<sub>2</sub>:</strong> σ<sub>2s</sub> &lt; σ*<sub>2s</sub> &lt; σ<sub>2p</sub> &lt; π<sub>2p</sub> &lt; π*<sub>2p</sub> &lt; σ*<sub>2p</sub></li>
            <li><strong>Li<sub>2</sub> to N<sub>2</sub>:</strong> σ<sub>2s</sub> &lt; σ*<sub>2s</sub> &lt; π<sub>2p</sub> &lt; σ<sub>2p</sub> &lt; π*<sub>2p</sub> &lt; σ*<sub>2p</sub></li>
          </ul>
          <p>
            The difference is <em>s&ndash;p mixing</em>. In the lighter atoms the 2s and 2p
            orbitals are close in energy, so σ<sub>2s</sub> and σ<sub>2p</sub> (which have the
            same symmetry) interact: σ<sub>2s</sub> is pushed down and σ<sub>2p</sub> is pushed
            up, above the π<sub>2p</sub> pair. From oxygen onwards the 2s&ndash;2p gap is too
            large for the mixing to matter and σ<sub>2p</sub> drops back below π<sub>2p</sub>.
          </p>

          <h3>O<sub>2</sub>: bond order 2 and paramagnetic</h3>
          <p>
            Oxygen has six valence electrons, so O<sub>2</sub> has twelve to place. Fill in
            order: σ<sub>2s</sub> (2), σ*<sub>2s</sub> (2), σ<sub>2p</sub> (2), π<sub>2p</sub>{' '}
            (4). Two electrons are left for the two degenerate π*<sub>2p</sub> orbitals, and
            Hund&apos;s rule puts one in each with parallel spins:
          </p>
          <pre><code>{`O2:  (σ2s)² (σ*2s)² (σ2p)² (π2p)⁴ (π*2p)¹(π*2p)¹
     bonding = 2 + 2 + 4 = 8,  antibonding = 2 + 2 = 4
     bond order = (8 − 4)/2 = 2        two unpaired electrons → paramagnetic`}</code></pre>
          <p>
            The Lewis structure O=O has every electron paired and predicts a diamagnetic
            molecule; liquid oxygen is in fact held between the poles of a magnet. This is the
            classic success of MO theory. The ions follow immediately: O<sub>2</sub><sup>+</sup>{' '}
            loses a π* electron (bond order 2.5, shorter bond), superoxide O<sub>2</sub><sup>&minus;</sup>{' '}
            gains one (1.5) and peroxide O<sub>2</sub><sup>2&minus;</sup> gains two (1.0,
            diamagnetic).
          </p>

          <h3>N<sub>2</sub>: bond order 3</h3>
          <p>
            Nitrogen has five valence electrons, ten in total for N<sub>2</sub>, and the mixed
            ordering applies: σ<sub>2s</sub> (2), σ*<sub>2s</sub> (2), π<sub>2p</sub> (4),
            σ<sub>2p</sub> (2). Nothing reaches the antibonding 2p levels:
          </p>
          <pre><code>{`N2:  (σ2s)² (σ*2s)² (π2p)⁴ (σ2p)²
     bond order = (8 − 2)/2 = 3        all paired → diamagnetic
     HOMO = σ2p (not π2p), confirmed by photoelectron spectroscopy`}</code></pre>
          <p>
            Both orderings give bond order 3 for N<sub>2</sub>, but only the mixed one gets the
            highest occupied orbital right, which matters for ionisation energies and for how
            N<sub>2</sub> binds to metals. B<sub>2</sub> is the other tell-tale case: with the
            mixed ordering its two 2p electrons go one each into the π<sub>2p</sub> pair, so
            B<sub>2</sub> is paramagnetic, as observed; the unmixed ordering would wrongly pair
            them in σ<sub>2p</sub>.
          </p>

          <table>
            <thead>
              <tr>
                <th>Molecule</th>
                <th>Valence e&minus;</th>
                <th>Configuration</th>
                <th>Bond order</th>
                <th>Magnetism</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>H<sub>2</sub></td><td>2</td><td>(σ1s)²</td><td>1</td><td>diamagnetic</td></tr>
              <tr><td>He<sub>2</sub></td><td>4</td><td>(σ1s)²(σ*1s)²</td><td>0</td><td>&ndash;</td></tr>
              <tr><td>Li<sub>2</sub></td><td>2</td><td>(σ2s)²</td><td>1</td><td>diamagnetic</td></tr>
              <tr><td>Be<sub>2</sub></td><td>4</td><td>(σ2s)²(σ*2s)²</td><td>0</td><td>&ndash;</td></tr>
              <tr><td>B<sub>2</sub></td><td>6</td><td>(σ2s)²(σ*2s)²(π2p)²</td><td>1</td><td>paramagnetic</td></tr>
              <tr><td>C<sub>2</sub></td><td>8</td><td>(σ2s)²(σ*2s)²(π2p)⁴</td><td>2</td><td>diamagnetic</td></tr>
              <tr><td>N<sub>2</sub></td><td>10</td><td>(σ2s)²(σ*2s)²(π2p)⁴(σ2p)²</td><td>3</td><td>diamagnetic</td></tr>
              <tr><td>O<sub>2</sub></td><td>12</td><td>(σ2s)²(σ*2s)²(σ2p)²(π2p)⁴(π*2p)²</td><td>2</td><td>paramagnetic</td></tr>
              <tr><td>F<sub>2</sub></td><td>14</td><td>(σ2s)²(σ*2s)²(σ2p)²(π2p)⁴(π*2p)⁴</td><td>1</td><td>diamagnetic</td></tr>
              <tr><td>Ne<sub>2</sub></td><td>16</td><td>&hellip;(π*2p)⁴(σ*2p)²</td><td>0</td><td>&ndash;</td></tr>
            </tbody>
          </table>

          {/* ── Heteronuclear ── */}
          <h2>Heteronuclear Diatomics: CO and NO</h2>
          <p>
            When the two atoms differ, their AOs start at different energies: the more
            electronegative atom (O in CO) has lower-lying orbitals and is drawn lower on its
            side. The MOs are no longer symmetric combinations. Each bonding MO lies closer in
            energy to the lower AO and has more of its character, each antibonding MO is closer
            to the higher AO. CO has ten valence electrons, the same as N<sub>2</sub>, and the
            same mixed ordering, so its bond order is 3. Its bonding orbitals are mostly oxygen
            in character, while the HOMO (the σ orbital at the top of the filled set) is
            concentrated on carbon as a lone pair, which is why CO binds to metals through the
            carbon atom. NO has eleven electrons, one of them in π*: bond order 2.5 and
            paramagnetic, and losing it to form NO<sup>+</sup> strengthens the bond to order 3.
          </p>

          {/* ── modiagram ── */}
          <h2>Drawing MO Diagrams with the modiagram Package</h2>
          <p>
            <code>modiagram</code> (CTAN, by Clemens Niederberger) draws the whole diagram from
            a description of the orbitals. It loads TikZ, <code>expl3</code> and{' '}
            <code>chemgreek</code> itself. Inside the <code>modiagram</code> environment,{' '}
            <code>\atom</code> places the AOs of the left or right atom, <code>\molecule</code>{' '}
            places the MOs, and <code>\EnergyAxis</code> adds the arrow. Each orbital is given
            as <code>{'{energy;electrons}'}</code>, where the energy is a height in centimetres
            and the electrons are <code>up</code>, <code>down</code> or <code>pair</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{modiagram}

\\begin{document}
\\begin{modiagram}[names, labels]
  \\atom[H]{left}{1s = {0;up}}
  \\atom[H]{right}{1s = {0;up}}
  \\molecule[H$_2$]{1sMO = {0.75;pair}}
  \\EnergyAxis
\\end{modiagram}
\\end{document}`}</code></pre>
          <p>
            For a molecular orbital the number is the splitting: <code>1sMO = {'{0.75;pair}'}</code>{' '}
            puts σ<sub>1s</sub> 0.75 cm below the lower 1s AO and σ*<sub>1s</sub> 0.75 cm above
            the higher one, and fills σ with a pair. A second electron specification after a
            comma fills σ*: <code>1sMO = {'{0.75;pair,pair}'}</code> is He<sub>2</sub>. The{' '}
            <code>names</code> option prints the atom and molecule names from the optional
            arguments, <code>labels</code> writes 1s, σ<sub>s</sub> and so on under each level,
            and the correlation lines are drawn automatically.
          </p>

          <h3>O<sub>2</sub> with modiagram</h3>
          <p>
            The 2p AOs take three electron specifications (p<sub>x</sub>, p<sub>y</sub>,
            p<sub>z</sub>). The <code>2pMO</code> key takes two energies, the σ splitting and
            the π splitting, then six electron slots in the order σ, π<sub>y</sub>,
            π<sub>z</sub>, π*<sub>y</sub>, π*<sub>z</sub>, σ*. modiagram takes <em>x</em> as
            the bond axis, so its labels read 2σ<sub>x</sub>, 2π<sub>y</sub> and 2π<sub>z</sub>{' '}
            rather than σ<sub>2p</sub>. A larger σ splitting than π splitting puts σ<sub>2p</sub>{' '}
            below π<sub>2p</sub>, which is the oxygen ordering:
          </p>
          <pre><code>{`\\begin{modiagram}[names, labels]
  \\atom[O]{left}{2s = {0;pair}, 2p = {4;pair,up,up}}
  \\atom[O]{right}{2s = {0;pair}, 2p = {4;pair,up,up}}
  \\molecule[O$_2$]{
    2sMO = {0.8;pair,pair},
    2pMO = {1.8,0.9;pair,pair,pair,up,up}   % σ, πy, πz, πy*, πz*, (σ* empty)
  }
  \\EnergyAxis
\\end{modiagram}`}</code></pre>
          <p>
            Trailing empty slots may be left out, so the two <code>up</code> electrons land in
            π*<sub>y</sub> and π*<sub>z</sub> and σ*<sub>2p</sub> stays empty: exactly the
            paramagnetic configuration above.
          </p>

          <h3>N<sub>2</sub> and the mixed ordering</h3>
          <p>
            To put π<sub>2p</sub> below σ<sub>2p</sub> while keeping σ*<sub>2p</sub> on top, give
            the bonding and antibonding splittings separately with a slash:
          </p>
          <pre><code>{`\\begin{modiagram}[names, labels]
  \\atom[N]{left}{2s = {0;pair}, 2p = {4;up,up,up}}
  \\atom[N]{right}{2s = {0;pair}, 2p = {4;up,up,up}}
  \\molecule[N$_2$]{
    2sMO = {0.8;pair,pair},
    2pMO = {0.6/2.2, 1.4/1.6;pair,pair,pair}   % σ/σ*, π/π* splittings
  }
  \\EnergyAxis
\\end{modiagram}`}</code></pre>
          <p>
            Here σ<sub>2p</sub> is 0.6 cm below the 2p level and π<sub>2p</sub> 1.4 cm below,
            so π comes first; σ*<sub>2p</sub> is 2.2 cm above and π*<sub>2p</sub> 1.6 cm above,
            so σ* is highest. The three <code>pair</code>s fill σ, π<sub>y</sub> and
            π<sub>z</sub>: ten electrons, bond order 3.
          </p>

          <h3>A heteronuclear diagram: CO</h3>
          <p>
            Give the two atoms different AO energies. modiagram measures each bonding MO down
            from the lower of the two AOs and each antibonding MO up from the higher one, which
            is the correct qualitative picture:
          </p>
          <pre><code>{`\\begin{modiagram}[names, labels]
  \\atom[C]{left}{2s = {0.8;pair}, 2p = {4.8;up,up}}
  \\atom[O]{right}{2s = {0;pair}, 2p = {3.8;pair,up,up}}
  \\molecule[CO]{
    2sMO = {0.6;pair,pair},
    2pMO = {0.7/2.0, 1.3/1.6;pair,pair,pair}
  }
  \\EnergyAxis[title]
\\end{modiagram}`}</code></pre>

          <h3>Options worth knowing</h3>
          <table>
            <thead>
              <tr>
                <th>Option / command</th>
                <th>Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>style=plain|square|circle|round|fancy</code></td><td>How the levels are drawn (default <code>plain</code>: a line)</td></tr>
              <tr><td><code>names</code>, <code>labels</code></td><td>Show atom/molecule names and orbital labels</td></tr>
              <tr><td><code>labels-fs=\footnotesize</code></td><td>Font size of the orbital labels</td></tr>
              <tr><td><code>distance=5cm</code></td><td>Horizontal distance between the two atoms (default 4 cm)</td></tr>
              <tr><td><code>AO-width=14pt</code></td><td>Width of each level line</td></tr>
              <tr><td><code>color={'{2piy*=red, 2piz*=red}'}</code> (inside <code>\molecule</code>)</td><td>Colour the electrons of named orbitals</td></tr>
              <tr><td><code>\EnergyAxis[title]</code>, <code>\EnergyAxis[title=E]</code></td><td>Axis with a caption at the top</td></tr>
              <tr><td><code>{`\\setmodiagram{style=square, AO-width=12pt}`}</code></td><td>Set options for every diagram in the document</td></tr>
              <tr><td><code>\AO{'{s}{0;pair}'}</code>, <code>\connect{'{AO1 & 2piy}'}</code></td><td>Add an arbitrary orbital and draw a line between two named orbital nodes</td></tr>
            </tbody>
          </table>
          <p>
            The orbital node names used by <code>color</code> and <code>\connect</code> are{' '}
            <code>1sleft</code>, <code>2pzright</code>, <code>1sigma</code>, <code>1sigma*</code>,{' '}
            <code>2sigma</code>, <code>2psigma</code>, <code>2piy</code>, <code>2piz*</code> and
            so on. The package only knows 1s, 2s and 2p; for d orbitals or a ligand field
            diagram you need TikZ. Older documents use <code>\begin{'{MOdiagram}'}</code> with
            a capital MO: it still works but prints a deprecation warning, and{' '}
            <code>\MOsetup</code> has become <code>\setmodiagram</code>.
          </p>

          {/* ── TikZ ── */}
          <h2>A Pure TikZ Molecular Orbital Diagram</h2>
          <p>
            Drawing the diagram directly in <Link href="/learn/tikz">TikZ</Link> gives full
            control: each level is a short thick line, each electron a <code>\uparrow</code> or{' '}
            <code>\downarrow</code> node on it, and the correlation lines are dashed. Styles
            defined once in the picture options keep it tidy. This is the O<sub>2</sub> diagram
            again, with mhchem for the formulas:
          </p>
          <pre><code>{`\\documentclass{standalone}
\\usepackage{tikz}
\\usepackage[version=4]{mhchem}

\\begin{document}
\\begin{tikzpicture}[
  level/.style={very thick},
  corr/.style={gray, dashed, thin},
  el/.style={font=\\normalsize},
  lbl/.style={font=\\small}
]
  % energy axis
  \\draw[->] (-0.5,-0.3) -- (-0.5,5) node[above] {$E$};

  % atomic orbitals of the two oxygen atoms
  \\foreach \\x/\\lab in {0/O, 6/O} {
    \\draw[level] (\\x,1) -- ++(0.8,0) node[midway, el] {$\\uparrow\\downarrow$};
    \\node[lbl, below] at (\\x+0.4,0.9) {$2s$};
    \\draw[level] (\\x-0.5,3.5) -- ++(0.8,0) node[midway, el] {$\\uparrow\\downarrow$};
    \\draw[level] (\\x+0.4,3.5) -- ++(0.8,0) node[midway, el] {$\\uparrow$};
    \\draw[level] (\\x+1.3,3.5) -- ++(0.8,0) node[midway, el] {$\\uparrow$};
    \\node[lbl, below] at (\\x+0.8,3.4) {$2p$};
    \\node[above] at (\\x+0.4,5) {\\ce{\\lab}};
  }

  % molecular orbitals
  \\draw[level] (3,0.3) -- ++(0.8,0) node[midway, el] {$\\uparrow\\downarrow$};
  \\node[lbl, right] at (3.9,0.3) {$\\sigma_{2s}$};
  \\draw[level] (3,1.7) -- ++(0.8,0) node[midway, el] {$\\uparrow\\downarrow$};
  \\node[lbl, right] at (3.9,1.7) {$\\sigma^*_{2s}$};
  \\draw[level] (3,2.6) -- ++(0.8,0) node[midway, el] {$\\uparrow\\downarrow$};
  \\node[lbl, right] at (3.9,2.6) {$\\sigma_{2p}$};
  \\draw[level] (2.5,3.1) -- ++(0.8,0) node[midway, el] {$\\uparrow\\downarrow$};
  \\draw[level] (3.5,3.1) -- ++(0.8,0) node[midway, el] {$\\uparrow\\downarrow$};
  \\node[lbl, right] at (4.4,3.1) {$\\pi_{2p}$};
  \\draw[level] (2.5,4.1) -- ++(0.8,0) node[midway, el] {$\\uparrow$};
  \\draw[level] (3.5,4.1) -- ++(0.8,0) node[midway, el] {$\\uparrow$};
  \\node[lbl, right] at (4.4,4.1) {$\\pi^*_{2p}$};
  \\draw[level] (3,4.8) -- ++(0.8,0);
  \\node[lbl, right] at (3.9,4.8) {$\\sigma^*_{2p}$};
  \\node[above] at (3.4,5) {\\ce{O2}};

  % correlation lines
  \\draw[corr] (0.8,1) -- (3,0.3);    \\draw[corr] (6,1) -- (3.8,0.3);
  \\draw[corr] (0.8,1) -- (3,1.7);    \\draw[corr] (6,1) -- (3.8,1.7);
  \\draw[corr] (2.1,3.5) -- (3,2.6);  \\draw[corr] (5.5,3.5) -- (3.8,2.6);
  \\draw[corr] (2.1,3.5) -- (3,4.8);  \\draw[corr] (5.5,3.5) -- (3.8,4.8);
\\end{tikzpicture}
\\end{document}`}</code></pre>
          <p>
            Do not name a style <code>dash</code>: TikZ already has a key of that name and
            stops with <em>The key &apos;/tikz/dash&apos; requires a value</em>. To extend the
            drawing, add levels and arrows in the same pattern; for a ligand field splitting
            (t<sub>2g</sub>/e<sub>g</sub>) the same lines-and-arrows approach works with five
            d levels on one side. If you would rather not place coordinates by hand, the{' '}
            <Link href="https://tools.useoctree.com/tools/tikz-generator" target="_blank" rel="noopener noreferrer">TikZ generator</Link>{' '}
            produces a starting picture you can edit.
          </p>

          {/* ── chemfig + mhchem ── */}
          <h2>Lewis Structures with chemfig and Formulas with mhchem</h2>
          <p>
            An MO diagram is often shown next to the Lewis structure it improves on.{' '}
            <code>chemfig</code> draws the structure, with <code>\charge</code> adding lone
            pairs and single electrons around an atom as a list of{' '}
            <code>angle=symbol</code> pairs: <code>\:</code> is a lone pair, <code>\.</code> a
            single electron and <code>\|</code> a pair drawn as a line, with 0 = right, 90 = top,
            180 = left and 270 = bottom. (Older tutorials use <code>\lewis{'{2:6:,O}'}</code>;
            chemfig 1.6 and later no longer define it, so on a current TeX Live it fails with{' '}
            <em>Undefined control sequence</em>.) <code>mhchem</code>&apos;s <code>\ce</code>{' '}
            formats formulas and charges, and works inside modiagram and TikZ labels:
          </p>
          <pre><code>{`\\usepackage{chemfig}
\\usepackage[version=4]{mhchem}
\\usepackage{modiagram}

\\ce{O2}, \\ce{N2}, \\ce{O2^-}, \\ce{O2^2-}, \\ce{He2^+}, \\ce{2 H2 + O2 -> 2 H2O}

\\chemfig{H-H}                                             % H2
\\chemfig{\\charge{90=\\:,270=\\:}{O}=\\charge{90=\\:,270=\\:}{O}}   % O=O, two lone pairs each
\\chemfig{\\charge{180=\\:}{N}~\\charge{0=\\:}{N}}                % N≡N (~ is a triple bond)
\\chemfig{\\charge{180=\\:}{C}~\\charge{0=\\:}{O}}                % C≡O
\\chemfig{\\charge{45=\\.}{O}}                                  % a single (radical) electron

\\begin{figure}[h]
  \\centering
  \\begin{minipage}{0.3\\textwidth}\\centering
    \\chemfig{\\charge{90=\\:,270=\\:}{O}=\\charge{90=\\:,270=\\:}{O}}
  \\end{minipage}
  \\begin{minipage}{0.6\\textwidth}\\centering
    \\begin{modiagram}[labels, distance=2.5cm]
      \\atom{left}{2p = {0;pair,up,up}}
      \\atom{right}{2p = {0;pair,up,up}}
      \\molecule{2pMO = {1,0.5;pair,pair,pair,up,up}}
    \\end{modiagram}
  \\end{minipage}
  \\caption{Lewis structure and 2p molecular orbitals of \\ce{O2}; bond order $(8-4)/2 = 2$.}
\\end{figure}`}</code></pre>
          <p>
            Names in <code>\molecule[...]</code> and <code>\atom[...]</code> accept{' '}
            <code>\ce</code> too, so <code>{`\\molecule[\\ce{O2}]{...}`}</code> gives a properly
            formatted subscript.
          </p>

          {/* ── Export ── */}
          <h2>Exporting the Figure</h2>
          <p>
            For a standalone image, put the diagram in a document with{' '}
            <code>{`\\documentclass{standalone}`}</code> (as in the TikZ example) and compile;
            the PDF is cropped to the picture and can be dropped into another document with{' '}
            <code>\includegraphics</code> or converted to SVG for a web page with{' '}
            <code>pdftocairo -svg</code> or <code>dvisvgm --pdf</code>. In a long thesis, the{' '}
            <code>external</code> TikZ library (<code>{`\\usetikzlibrary{external}`}</code>,{' '}
            <code>\tikzexternalize</code>) caches each picture as a PDF so it is not redrawn on
            every compile; it needs shell escape.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
          <table>
            <thead>
              <tr>
                <th>Symptom or message</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>Package modiagram Error: You need to specify the left and right atom first</em></td>
                <td><code>\molecule</code> before both <code>\atom</code> commands</td>
                <td>Put <code>\atom{'{left}'}</code> and <code>\atom{'{right}'}</code> before <code>\molecule</code></td>
              </tr>
              <tr>
                <td><em>You need to specify both 2p AOs first before you can use 2pMO</em></td>
                <td>An MO is requested whose parent AOs were not given on both sides</td>
                <td>Add the matching <code>2p=</code> (or <code>1s=</code>, <code>2s=</code>) to both atoms</td>
              </tr>
              <tr>
                <td><em>The key &apos;modiagram/color/blue&apos; is unknown</em></td>
                <td><code>color=blue</code> is not how the key works</td>
                <td>Name the orbital: <code>color={'{2piy*=blue}'}</code></td>
              </tr>
              <tr>
                <td>Levels and labels overlap</td>
                <td>Splittings too large or too small relative to the AO energies</td>
                <td>Adjust the energies; give σ and π different splittings; use <code>labels-fs=\scriptsize</code></td>
              </tr>
              <tr>
                <td><em>Package modiagram Warning: ... MOdiagram ... deprecated</em></td>
                <td>Old environment name</td>
                <td>Use <code>\begin{'{modiagram}'}</code> and <code>\setmodiagram</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \ce</em> / <em>\chemfig</em></td>
                <td>mhchem or chemfig not loaded</td>
                <td><code>{`\\usepackage[version=4]{mhchem}`}</code>, <code>{`\\usepackage{chemfig}`}</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \lewis</em> although chemfig is loaded</td>
                <td><code>\lewis</code> is gone from chemfig 1.6 and later; older tutorials still show it</td>
                <td>Use <code>{`\\charge{90=\\:,270=\\:}{O}`}</code></td>
              </tr>
              <tr>
                <td><em>The key &apos;/tikz/dash&apos; requires a value</em></td>
                <td>A custom style named <code>dash</code> clashes with a TikZ key</td>
                <td>Rename the style (<code>corr</code>, <code>link</code>)</td>
              </tr>
              <tr>
                <td>Electrons in the wrong orbitals</td>
                <td>Electron slots given in the wrong order</td>
                <td>Order is σ, π<sub>y</sub>, π<sub>z</sub>, π*<sub>y</sub>, π*<sub>z</sub>, σ* for <code>2pMO</code> and σ, σ* for <code>1sMO</code>/<code>2sMO</code></td>
              </tr>
            </tbody>
          </table>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>LaTeX</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Load the package</td><td><code>{`\\usepackage{modiagram}`}</code></td></tr>
              <tr><td>Atomic orbitals</td><td><code>{`\\atom[O]{left}{2s = {0;pair}, 2p = {4;pair,up,up}}`}</code></td></tr>
              <tr><td>s-type MOs</td><td><code>{`\\molecule{1sMO = {0.75;pair,pair}}`}</code> (σ then σ*)</td></tr>
              <tr><td>p-type MOs</td><td><code>{`2pMO = {σ-split,π-split; σ,πy,πz,πy*,πz*,σ*}`}</code></td></tr>
              <tr><td>Separate bonding / antibonding splittings</td><td><code>{`2pMO = {0.6/2.2, 1.4/1.6; ...}`}</code></td></tr>
              <tr><td>Energy axis</td><td><code>\EnergyAxis</code>, <code>\EnergyAxis[title]</code></td></tr>
              <tr><td>Names and labels</td><td><code>{`\\begin{modiagram}[names, labels]`}</code></td></tr>
              <tr><td>Electron arrows in TikZ</td><td><code>{`\\node at (x,y) {$\\uparrow\\downarrow$};`}</code></td></tr>
              <tr><td>Chemical formula</td><td><code>{`\\ce{O2^-}`}</code> (mhchem)</td></tr>
              <tr><td>Lewis structure</td><td><code>{`\\chemfig{\\charge{90=\\:,270=\\:}{O}=\\charge{90=\\:,270=\\:}{O}}`}</code></td></tr>
              <tr><td>Bond order</td><td>(bonding &minus; antibonding) / 2</td></tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you calculate bond order from a molecular orbital diagram?</h3>
          <p>
            Count the electrons in bonding orbitals, subtract the electrons in antibonding
            orbitals and divide by two: bond order = (bonding &minus; antibonding) / 2. For
            O<sub>2</sub> that is (8 &minus; 4) / 2 = 2, a double bond; for N<sub>2</sub> it is
            (8 &minus; 2) / 2 = 3; for He<sub>2</sub> it is (2 &minus; 2) / 2 = 0, which is why
            He<sub>2</sub> does not exist. A higher bond order means a shorter, stronger bond.
          </p>
          <h3>Why is O<sub>2</sub> paramagnetic according to MO theory?</h3>
          <p>
            O<sub>2</sub> has 12 valence electrons. After filling σ<sub>2s</sub>,
            σ*<sub>2s</sub>, σ<sub>2p</sub> and the two π<sub>2p</sub> orbitals, two electrons
            remain for the two degenerate π*<sub>2p</sub> orbitals. By Hund&apos;s rule they
            occupy one each with parallel spins, so O<sub>2</sub> has two unpaired electrons and
            is attracted into a magnetic field. A Lewis structure, with all electrons paired,
            cannot explain this; the MO diagram does.
          </p>
          <h3>Why is the MO order different for N<sub>2</sub> and O<sub>2</sub>?</h3>
          <p>
            For B<sub>2</sub>, C<sub>2</sub> and N<sub>2</sub> the 2s and 2p atomic orbitals are
            close enough in energy that the σ<sub>2s</sub> and σ<sub>2p</sub> molecular
            orbitals mix (s&ndash;p mixing). The mixing pushes σ<sub>2p</sub> up above the
            π<sub>2p</sub> pair, so the order is σ<sub>2s</sub> &lt; σ*<sub>2s</sub> &lt;
            π<sub>2p</sub> &lt; σ<sub>2p</sub>. In O<sub>2</sub> and F<sub>2</sub> the 2s&ndash;2p
            gap is larger, the mixing is weak, and σ<sub>2p</sub> lies below π<sub>2p</sub>. The
            two orderings give the same bond order for O<sub>2</sub> and N<sub>2</sub> but change
            which orbital is the HOMO.
          </p>
          <h3>What LaTeX package draws MO diagrams?</h3>
          <p>
            modiagram is the dedicated package: <code>{`\\usepackage{modiagram}`}</code> gives
            you a <code>modiagram</code> environment with <code>\atom</code> for the atomic
            orbitals, <code>\molecule</code> for the molecular orbitals and{' '}
            <code>\EnergyAxis</code>, and it draws the levels, electrons and correlation lines
            for 1s, 2s and 2p for you. It is built on TikZ, so for anything it does not cover
            (d orbitals, ligand field diagrams, more than two fragments) you draw the diagram
            directly in TikZ.
          </p>
          <h3>How do I write O<sub>2</sub>, N<sub>2</sub> or O<sub>2</sub><sup>&minus;</sup> with proper formatting in LaTeX?</h3>
          <p>
            Load mhchem with <code>{`\\usepackage[version=4]{mhchem}`}</code> and write{' '}
            <code>\ce{'{O2}'}</code>, <code>\ce{'{N2}'}</code>, <code>\ce{'{O2^-}'}</code> and{' '}
            <code>\ce{'{CO}'}</code>. <code>\ce</code> sets the subscripts and charges upright
            and in the right position, works in text and in math mode, and also handles
            reaction arrows such as <code>\ce{'{2 H2 + O2 -> 2 H2O}'}</code>. It can be used
            inside modiagram and TikZ labels too.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Diagram drawn? These guides cover the surrounding figure work:</p>
          <ul>
            <li><Link href="/learn/tikz">TikZ Diagrams in LaTeX</Link> &ndash; Coordinates, nodes, styles and <code>\foreach</code>, everything the TikZ version above relies on</li>
            <li><Link href="/learn/pgfplots">Plots with pgfplots</Link> &ndash; Potential energy curves and spectra to put next to the MO diagram</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &ndash; σ, π and the arrows used for electrons</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> &ndash; Formulas and orbital labels without mhchem</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; Tabulate bond orders and configurations</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/tikz-generator" target="_blank" rel="noopener noreferrer">TikZ Generator</Link> &ndash; Generate a TikZ picture to start your diagram from</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile modiagram and chemfig code with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Arrows and Greek letters for labels</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX diagrams" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Draw chemistry figures faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe the molecule and Octree&apos;s AI editor writes the modiagram or TikZ
              code, fixes the package errors, and compiles the figure in seconds.
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
