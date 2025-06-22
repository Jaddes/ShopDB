function inicijalizujLogickoBrisanje() {
  const logicalBtn = document.getElementById('logicalDeleteBtn');
  logicalBtn.addEventListener('click', async () => {
    if (!window.selectedUserId) return;
    await fetch(`${window.API_BASE_URL}/api/korisnici/logicko_brisanje/${window.selectedUserId}`, {
      method: 'PUT'
    });
    document.getElementById('deleteConfirmModal').style.display = 'none';
    window.prikaziKorisnike();
  });
}

window.inicijalizujLogickoBrisanje = inicijalizujLogickoBrisanje;
