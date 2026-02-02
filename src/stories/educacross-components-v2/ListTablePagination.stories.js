/**
 * ListTablePagination - Table Pagination Controls
 */

export default {
  title: 'Educacross Components V2/Tables/ListTablePagination',
  tags: ['autodocs']
};

const styles = `<style>
.pagination{display:flex;align-items:center;gap:8px;padding:16px 0;justify-content:space-between}.pagination-info{font-size:14px;color:#6E6B7B}.pagination-controls{display:flex;align-items:center;gap:4px}.page-btn{min-width:36px;height:36px;padding:0 12px;border-radius:6px;border:1px solid #D8D6DE;background:#fff;color:#6E6B7B;font-weight:600;font-size:14px;cursor:pointer;transition:.2s;display:flex;align-items:center;justify-content:center}.page-btn:hover:not(:disabled){background:#F3F2F7;border-color:#6E63E8}.page-btn.active{background:#6E63E8;color:#fff;border-color:#6E63E8}.page-btn:disabled{cursor:not-allowed;opacity:0.4}.page-btn i{font-size:16px}
</style>`;

export const Default={render:()=>`${styles}<div class="pagination"><div class="pagination-info">Mostrando 1 a 10 de 45 registros</div><div class="pagination-controls"><button class="page-btn" disabled><i class="bi bi-chevron-left"></i></button>${[1,2,3,4,5].map((p,i)=>`<button class="page-btn${i===0?' active':''}">${p}</button>`).join('')}<button class="page-btn"><i class="bi bi-chevron-right"></i></button></div></div>`};

export const PaginaMedia={render:()=>`${styles}<div class="pagination"><div class="pagination-info">Mostrando 21 a 30 de 87 estudantes</div><div class="pagination-controls"><button class="page-btn"><i class="bi bi-chevron-left"></i></button>${[1,'...',3,4,5,'...',9].map((p,i)=>`<button class="page-btn${i===2?' active':''}">${p}</button>`).join('')}<button class="page-btn"><i class="bi bi-chevron-right"></i></button></div></div>`};

export const UltimaPagina={render:()=>`${styles}<div class="pagination"><div class="pagination-info">Mostrando 91 a 100 de 100 missões</div><div class="pagination-controls"><button class="page-btn"><i class="bi bi-chevron-left"></i></button>${[1,'...',8,9,10].map((p,i)=>`<button class="page-btn${i===4?' active':''}">${p}</button>`).join('')}<button class="page-btn" disabled><i class="bi bi-chevron-right"></i></button></div></div>`};

export const PoucasPages={render:()=>`${styles}<div class="pagination"><div class="pagination-info">Mostrando 11 a 18 de 18 alunos</div><div class="pagination-controls"><button class="page-btn"><i class="bi bi-chevron-left"></i></button>${[1,2].map((p,i)=>`<button class="page-btn${i===1?' active':''}">${p}</button>`).join('')}<button class="page-btn" disabled><i class="bi bi-chevron-right"></i></button></div></div>`};

export const Compacta={render:()=>`${styles}<div class="pagination" style="padding:8px 0"><div class="pagination-controls" style="margin:0 auto"><button class="page-btn" style="min-width:32px;height:32px;padding:0 8px"><i class="bi bi-chevron-left"></i></button>${[1,2,3].map((p,i)=>`<button class="page-btn${i===0?' active':''}" style="min-width:32px;height:32px">${p}</button>`).join('')}<button class="page-btn" style="min-width:32px;height:32px;padding:0 8px"><i class="bi bi-chevron-right"></i></button></div></div>`};

export const ComPorPagina={render:()=>`${styles}<style>.per-page{display:flex;align-items:center;gap:8px;font-size:14px}.per-page select{padding:6px 30px 6px 12px;border-radius:6px;border:1px solid #D8D6DE;background:#fff;font-weight:600;cursor:pointer}</style><div class="pagination"><div style="display:flex;align-items:center;gap:20px"><div class="per-page">Mostrar <select><option>10</option><option>25</option><option>50</option><option>100</option></select> por página</div><div class="pagination-info">Mostrando 1 a 25 de 156 registros</div></div><div class="pagination-controls"><button class="page-btn"><i class="bi bi-chevron-left"></i></button>${[1,2,3,4,5,6,7].map((p,i)=>`<button class="page-btn${i===0?' active':''}">${p}</button>`).join('')}<button class="page-btn"><i class="bi bi-chevron-right"></i></button></div></div>`};

export const Mobile={render:()=>`${styles}<div class="pagination" style="flex-direction:column;gap:12px;align-items:center"><div class="pagination-info">Página 2 de 8 • 45 total</div><div class="pagination-controls"><button class="page-btn"><i class="bi bi-chevron-left"></i></button>${[1,2,3,4,5].map((p,i)=>`<button class="page-btn${i===1?' active':''}">${p}</button>`).join('')}<button class="page-btn"><i class="bi bi-chevron-right"></i></button></div></div>`};

export const ListaAlunos={render:()=>`${styles}<div style="background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:16px"><div style="margin-bottom:12px;font-size:16px;font-weight:600;color:#5E5873">Alunos da Turma 8º Ano A</div><div style="font-size:13px;color:#6E6B7B;margin-bottom:16px">Total de 42 estudantes cadastrados</div><div class="pagination"><div class="pagination-info">Mostrando 1 a 10 de 42 alunos</div><div class="pagination-controls"><button class="page-btn" disabled><i class="bi bi-chevron-left"></i></button>${[1,2,3,4,5].map((p,i)=>`<button class="page-btn${i===0?' active':''}">${p}</button>`).join('')}<button class="page-btn"><i class="bi bi-chevron-right"></i></button></div></div></div><p style="margin-top:12px;font-size:13px;color:#6E6B7B"><strong>Contexto:</strong> Paginação de lista de estudantes (coordenador navegando turma).</p>`};
