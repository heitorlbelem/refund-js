const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const expenseList = document.querySelector('ul')
const expenseCount = document.querySelector('aside header p span')
const expensesTotal = document.querySelector('aside header h2')

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, '')

  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value)
}

form.onsubmit = (event) => {
  event.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }

  createExpense(newExpense)
}

expenseList.addEventListener('click', (event) => {
  if(event.target.classList.contains('remove-icon')) {
    const item = event.target.closest('li')
    item.remove()
  }

  updateTotal()
})

function formatCurrencyBRL(value) {
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return value
}

function createExpense(newExpense) {
  try {
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute('src', `assets/icons/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', `${newExpense.category_name}`)

    const expenseInfo = document.createElement('h3')
    expenseInfo.innerHTML = `
      ${newExpense.expense}
      <span>${newExpense.category_name}</span>
    `

    const expenseAmount = document.createElement('p')
    const amountValue = newExpense.amount.toUpperCase().replace('R$', '')
    expenseAmount.innerHTML = `<small>R$</small> ${amountValue}`

    const removeIcon = document.createElement('img')
    removeIcon.classList.add('remove-icon')
    removeIcon.setAttribute('src', 'assets/icons/x_bold.svg')
    removeIcon.setAttribute('alt', 'remover')

    expenseItem.append(
      expenseIcon, expenseInfo, expenseAmount, removeIcon
    )
    expenseList.append(expenseItem)

    clearForm()
    updateTotal()
  } catch(error) {
    alert('Não fio possível atualizar a lista de despesas')
    console.error(error)
  }
}

function updateTotal() {
  try {
    const items = expenseList.children
    expenseCount.textContent = `${items.length} ${items.length > 1 ? 'despesas': 'despesa'}`

    let total = 0;
    for (const item of items) {
      let value = item.querySelector('p').textContent
      value = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'))

      if(isNaN(value)) {
        throw new Error('não foi possível calcular o total')
      }

      total += Number(value)
    }

    total = formatCurrencyBRL(total).toUpperCase().replace('R$', '')
    expensesTotal.innerHTML = `<small>R$</small> ${formatCurrencyBRL(total)}`
  } catch (error) {
    console.log(error)
    console.log('Não foi possível atualizar o valor total')
  }
}

function clearForm() {
  amount.value = ''
  expense.value = ''
  category.value = ''

  expense.focus()
}