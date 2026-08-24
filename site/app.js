const buttons = [...document.querySelectorAll('[data-grade]')]
const decks = [...document.querySelectorAll('[data-deck]')]

function selectGrade(grade, updateUrl = true) {
  const selected = String(grade) === '8' ? '8' : '7'

  for (const button of buttons) {
    const active = button.dataset.grade === selected
    button.setAttribute('aria-selected', String(active))
    button.tabIndex = active ? 0 : -1
  }

  for (const deck of decks) {
    deck.hidden = deck.dataset.deck !== selected
  }

  if (updateUrl) {
    const url = new URL(window.location.href)
    url.searchParams.set('grade', selected)
    history.replaceState({}, '', url)
  }
}

for (const button of buttons) {
  button.addEventListener('click', () => selectGrade(button.dataset.grade))
  button.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return
    event.preventDefault()
    const next = button.dataset.grade === '7' ? '8' : '7'
    selectGrade(next)
    buttons.find((item) => item.dataset.grade === next)?.focus()
  })
}

selectGrade(new URL(window.location.href).searchParams.get('grade'), false)
