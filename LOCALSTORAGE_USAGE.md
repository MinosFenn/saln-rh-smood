# Utilisation du localStorage

## Système actuel (simplifié)

Le système utilise maintenant **uniquement** le localStorage pour gérer les tours via `turnLogic.ts` :

### Clé utilisée : `wheel_turn_data`

```typescript
// Structure stockée
{
  currentTurn: number,    // Tour actuel (1, 2, 3, ...)
  totalPlays: number,     // Nombre total de tours joués
  lastPlayDate: string    // Date du dernier jeu (YYYY-MM-DD)
}
```

### Fonctions utilisées :

- `getCurrentTurnState()` : Récupère l'état actuel
- `saveTurnState(state)` : Sauvegarde l'état
- `incrementTurn()` : Passe au tour suivant et sauvegarde

## Ancien système supprimé

L'ancien système de localStorage (`wheelLogic.ts`) a été supprimé car il était redondant :

### ❌ Supprimé :
- `saveLocalState()` 
- `readLocalState()`
- `clearLocalState()`
- Interface `WheelState`
- Clé `B2S_wheel_25_state`

## Pourquoi le localStorage est encore utilisé ?

Le localStorage est **nécessaire** pour :

1. **Persistance des tours** : Mémoriser le tour actuel entre les sessions
2. **Compteur de jeux** : Garder le nombre total de tours joués
3. **Expérience utilisateur** : L'utilisateur reprend où il s'est arrêté

## Alternative possible

Si vous voulez supprimer complètement le localStorage, il faudrait :

1. **Toujours commencer au tour 1** (pas de persistance)
2. **Pas de compteur de jeux** (reset à chaque rechargement)
3. **Expérience plus simple** mais moins engageante

## Recommandation

**Garder le localStorage** car il améliore l'expérience utilisateur en permettant :
- La progression des tours
- Le suivi des jeux
- La continuité entre les sessions

Le système est maintenant **optimisé** avec un seul localStorage pour les tours uniquement.
