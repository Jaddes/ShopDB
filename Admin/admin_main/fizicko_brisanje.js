function inicijalizujFizickoBrisanje() {
  const physicalBtn = document.getElementById('physicalDeleteBtn');
  physicalBtn.addEventListener('click', async () => {
    if (!window.selectedUserId) return;
    await fetch(`${window.API_BASE_URL}/api/korisnici/fizicko_brisanje/${window.selectedUserId}`, {
      method: 'DELETE'
    });
    document.getElementById('deleteConfirmModal').style.display = 'none';
    window.prikaziKorisnike();
  });
}

window.inicijalizujFizickoBrisanje = inicijalizujFizickoBrisanje;
