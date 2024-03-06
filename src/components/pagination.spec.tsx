import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { PaginationLinks } from './pagination'

// Spie - simula função de funcionamento, anotando os parametros e metricas de seu funcionamento.
const onPageChangeCallBack = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallBack.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <PaginationLinks
        onPageChange={() => {}}
        pageIndex={0}
        perPage={10}
        totalCount={200}
      />,
    )

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <PaginationLinks
        onPageChange={onPageChangeCallBack}
        pageIndex={5}
        perPage={10}
        totalCount={200}
      />,
    )

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(previousPageButton)

    expect(onPageChangeCallBack).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <PaginationLinks
        onPageChange={onPageChangeCallBack}
        pageIndex={5}
        perPage={10}
        totalCount={200}
      />,
    )

    const firstPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(firstPageButton)

    expect(onPageChangeCallBack).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <PaginationLinks
        onPageChange={onPageChangeCallBack}
        pageIndex={0}
        perPage={10}
        totalCount={200}
      />,
    )

    const lastPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(lastPageButton)

    expect(onPageChangeCallBack).toHaveBeenCalledWith(19)
  })
})
