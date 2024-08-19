const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

const expenseList = document.querySelector('ul')

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

    expenseItem.append(
      expenseIcon, expenseInfo, expenseAmount
    )
    expenseList.append(expenseItem)
  } catch(error) {
    alert('Não fio possível atualizar a lista de despesas')
    console.error(error)
  }
}