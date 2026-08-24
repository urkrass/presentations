const buttons = [...document.querySelectorAll('[data-grade]')]
const decks = [...document.querySelectorAll('[data-deck]')]

function selectGrade(grade, updateUrl = true) {
  const requested = String(grade)
  const selected = buttons.some((button) => button.dataset.grade === requested) ? requested : '7'

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
    const index = buttons.indexOf(button)
    const offset = event.key === 'ArrowRight' ? 1 : -1
    const next = buttons[(index + offset + buttons.length) % buttons.length].dataset.grade
    selectGrade(next)
    buttons.find((item) => item.dataset.grade === next)?.focus()
  })
}

selectGrade(new URL(window.location.href).searchParams.get('grade'), false)
